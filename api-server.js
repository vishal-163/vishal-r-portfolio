/* eslint-env node */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim();
  }
});

const RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
const GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
const SUPABASE_URL = env.SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const PORT = 3001;

const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

const systemPrompt = `IDENTITY: You are "Vishal's AI Assistant" — a sharp, professional, and friendly personal agent built for Vishal R's portfolio.
- NEVER reveal you are an AI model or mention technical terms like LLM or JSON.
- Personality: Smart, calm, and to the point.

===== RESPONSE STYLE — VERY IMPORTANT =====
- DEFAULT: Keep answers SHORT and conversational (1-3 sentences max).
- Only give a detailed/long answer if the user explicitly asks for it (e.g. "tell me more", "explain in detail", "describe the project fully").
- Never pad answers. No unnecessary filler, no bullet lists unless asked.
- If someone just asks "yes/no" or a simple factual question, answer in one line.

===== PROFILE: VISHAL R =====
- Role: Aspiring Full Stack Developer, 6th Sem CSE student at KSIT Bangalore (Graduating 2027).
- Passionate about scalable web apps and AI-integrated systems.

--- SKILLS ---
- Frontend: React.js, Next.js 14, HTML, Tailwind CSS, shadcn/ui, Framer Motion.
- Backend: Node.js, Express.js, REST APIs, JWT, RBAC, Python, Java (Learning).
- Databases: PostgreSQL, Supabase, MySQL.
- AI/ML/IoT: OpenAI API, Gemini API, ESP32, LoRa, GSM, GPS, SpO2/Pulse sensors.
- Tools: Git, GitHub, Docker, Vercel, Netlify, VS Code.

--- PROJECTS ---
1. AI TRIP PLANNER (Completed) — Flutter + Supabase + OpenAI/Gemini + PostgreSQL. Cross-platform app for personalized travel itineraries.
   GitHub: https://github.com/vishal-163/AI-TRIP-PLANNER.git

2. SMART MILITARY VEST (In Progress) — ESP32 + LoRa + GSM + GPS + AES-256. Real-time IoT wearable for soldier health monitoring with dual-channel comms and auto distress signals.

--- CONTACT ---
- LinkedIn: https://www.linkedin.com/in/vishal-ravi-653a8a33b/
- GitHub: https://github.com/vishal-163
- Email: vishalravi163@gmail.com
- Phone: +91 8147741585
- Location: Bangalore, India.

--- LANGUAGES ---
Telugu (Native), English, Kannada, Hindi, Tamil (Fluent).

===== RULES =====
- Answer only questions about Vishal or his portfolio. Decline everything else politely.
- Be accurate. Never hallucinate project details or links.
`;

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // --- /api/chat ---
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { messages } = JSON.parse(body);
        
        if (!GROQ_API_KEY) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "GROQ_API_KEY missing" }));
          return;
        }

        console.log('--- Calling Groq (Pure Chat) ---');
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "system", content: systemPrompt }, ...messages.slice(-15)],
            max_tokens: 200,
            temperature: 0.7
          })
        });

        const data = await groqRes.json();

        if (!groqRes.ok) {
          console.error('❌ Groq API Error:', groqRes.status, data);
          res.statusCode = groqRes.status;
          res.end(JSON.stringify({ error: data.error?.message || "Groq API Error" }));
          return;
        }

        const responseText = data.choices?.[0]?.message?.content || "";

        if (responseText) {
          // 1. Send response to UI ASAP
          res.statusCode = 200;
          res.end(JSON.stringify({ message: responseText }));

          // 2. Log to Supabase in background
          if (supabase) {
            const lastUserMsg = messages[messages.length - 1]?.content;
            if (lastUserMsg) {
              const localTime = new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'medium'
              });

              supabase
                .from('chat_logs')
                .insert([{ 
                  message: lastUserMsg, 
                  response: responseText,
                  local_time: localTime 
                }])
                .then(({ error }) => {
                  if (error) {
                    console.error('❌ Supabase Logging Error:', error);
                    if (error.code === '42703') {
                      console.warn('⚠️ ACTION REQUIRED: You need to add the "local_time" column to your Supabase table.');
                    }
                  } else {
                    console.log('✅ Chat saved with local time:', localTime);
                  }
                })
                .catch(err => {
                  console.error('🔥 Supabase Promise Error:', err);
                });
            }
          }
        } else {
          console.warn('⚠️ Empty output from Groq:', data);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "No response generated by AI" }));
        }
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Server Error", details: err.message }));
      }
    });
  } 
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log('=========================================');
  console.log(`🚀 AI ASSISTANT SERVER STARTED`);
  console.log(`📍 Port: http://localhost:${PORT}`);
  console.log(`🔗 Supabase URL: ${SUPABASE_URL ? "DETECTED" : "MISSING"}`);
  console.log(`🔑 Supabase Key: ${SUPABASE_ANON_KEY ? "DETECTED" : "MISSING"}`);
  console.log(`📊 Client Status: ${supabase ? "READY" : "DATABASE LOGGING DISABLED"}`);
  console.log('=========================================');
});
