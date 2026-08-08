/* eslint-env node */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import dns from 'dns';

// Fix for Node.js 17+ fetch failing on some networks due to IPv6 resolution
dns.setDefaultResultOrder('ipv4first');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local robustly
dotenv.config({ path: path.join(__dirname, '.env.local') });

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const PORT = process.env.PORT || 3002;

const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const systemPrompt = `IDENTITY: You are "Vishal's AI Assistant" — a high-IQ, professional, and friendly personal agent built for Vishal R's portfolio.
- NEVER reveal you are an AI model or mention technical terms like LLM or JSON.
- Personality: Smart, calm, helpful, and concise. Speak like a professional assistant, not a robot.

===== EXHAUSTIVE PROFILE: VISHAL R =====
- Current Role: Aspiring Full Stack Developer & 7th sem of final year Computer Science Engineering student at K.S. Institute of Technology, Bangalore (Expected Graduation: 2027).
- Summary: Passionate about building scalable web and AI-integrated applications with a focus on high-precision system design and production-grade reliability.

--- TECHNICAL SKILLS ---
- Frontend: React.js, Next.js 14, HTML, Tailwind CSS, shadcn/ui, Framer Motion.
- Backend: Node.js, Express.js, REST APIs, JWT Authentication, RBAC, Python, Java (Learning).
- Databases: PostgreSQL, Supabase, MySQL.
- AI/ML/IoT: OpenAI API, Gemini API, Flash, ESP32, Sensors (Pulse, SpO2), LoRa, GSM, GPS.
- Tools: Git, GitHub, Docker, Vercel, Netlify, VS Code.

--- CORE PROJECTS ---
1. AI TRIP PLANNER (Completed)
   - Tech: Flutter, Supabase, OpenAI API, Gemini API, PostgreSQL.
   - Details: A cross-platform mobile app generating personalized travel itineraries. Engineered with a modular 3-tier architecture and deterministic JSON logic for seamless UI rendering.
   - Code: https://github.com/vishal-163/AI-TRIP-PLANNER.git

2. SMART MILITARY VEST - IoT Defence System (In Progress)
   - Tech: ESP32, Sensors, LoRa, GSM, GPS, MQTT, AES-256 Encryption.
   - Details: A wearable system for real-time soldier health monitoring (SpO2, Heart Rate, Temperature). Features dual-channel communication (LoRa/GSM) and an intelligent automated distress signal generator.

--- CONTACT & SOCIALS ---
- Name: VISHAL R
- LinkedIn: https://www.linkedin.com/in/vishal-ravi-653a8a33b/
- GitHub: https://github.com/vishal-163
- Email: vishalravi163@gmail.com
- Phone: +91 8147741585
- Location: Bangalore, India.

--- LANGUAGES ---
- Telugu (Native), English, Kannada, Hindi, Tamil (Fluent).

===== CONVERSATIONAL RULES =====
- Be natural and concise. 
- Use the above details to answer any questions about Vishal's projects, skills, or experience with 100% accuracy.
- If a user asks for a project link, provide the GitHub URL accurately.
- DO NOT answer questions unrelated to Vishal R or his professional portfolio.
- Do not take "tk" for thank check whether they are referring to surname or other than reply.
- if they are talking about any other Vishal other than Vishal R u must kindly deny them in a positive manner.
`;

const app = express();

app.use(cors());
app.use(express.json());

// --- /api/chat ---
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, currentSection } = req.body;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: "Configuration Error: GROQ_API_KEY is missing" });
    }
    if (!messages) {
      return res.status(400).json({ error: "Bad Request: Missing messages" });
    }

    let finalSystemPrompt = systemPrompt;
    if (currentSection) {
      finalSystemPrompt += `\n\n[SYSTEM NOTE: The user is currently viewing the '${currentSection}' section of the portfolio. If relevant to their question, briefly acknowledge that you know what they are looking at!]`;
    }

    const apiMessages = [
      { role: "system", content: finalSystemPrompt },
      ...messages.slice(-10)
    ];

    console.log('--- Calling Groq (Express Server) ---');
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: apiMessages,
        max_tokens: 500,
        temperature: 0.1
      })
    });

    const data = await groqRes.json().catch(() => ({}));

    if (!groqRes.ok) {
      console.error('❌ Groq API Error:', groqRes.status, data);
      return res.status(groqRes.status).json({
        error: data.error?.message || "Groq API Error",
        status: groqRes.status
      });
    }

    const responseText = data.choices?.[0]?.message?.content || "";

    if (!responseText) {
      return res.status(500).json({ error: "No response generated by AI" });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";

    if (supabase && lastUserMessage) {
      try {
        const localTime = new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'medium'
        });

        const { error } = await supabase.from('chat_logs').insert([
          {
            message: lastUserMessage,
            response: responseText,
            local_time: localTime
          }
        ]);

        if (error) {
          let errorMsg = error.message;
          if (errorMsg && errorMsg.includes('<html')) {
            errorMsg = "Supabase project is PAUSED or DOWN. Please log in to Supabase dashboard to unpause it!";
          }
          console.error("❌ Logging failed:", errorMsg);
        }
      } catch (err) {
        console.error("❌ Logging catch error:", err);
      }
    }

    return res.status(200).json({ message: responseText });

  } catch (error) {
    console.error("HANDLED BACKEND ERROR:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: error.message
      });
    }
  }
});

// --- /api/resume-action ---
app.post('/api/resume-action', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: "Supabase configuration missing" });
    }
    
    const userAgentStr = req.headers["user-agent"] || "";
    // Dynamic import to avoid missing module errors
    const { UAParser } = await import('ua-parser-js');
    const parser = new UAParser(userAgentStr);
    const os = parser.getOS();
    const browser = parser.getBrowser();
    const deviceOs = `${os.name || 'Unknown OS'} ${os.version || ''}`.trim();
    const browserName = `${browser.name || 'Unknown Browser'} ${browser.version || ''}`.trim();

    const city = req.headers["x-vercel-ip-city"] || req.headers["x-forwarded-for"] || "Unknown City";
    const region = req.headers["x-vercel-ip-country-region"] || "";
    const country = req.headers["x-vercel-ip-country"] || "Unknown Country";
    const location = req.headers["x-vercel-ip-city"] 
      ? (region ? `${city}, ${region}, ${country}` : `${city}, ${country}`) 
      : (process.env.RENDER ? "Render Deploy" : "Localhost (Development)");

    const localTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    });

    const { error } = await supabase.from('resume_downloads').insert([{
      device_os: deviceOs,
      browser: browserName,
      location: location,
      local_time: localTime
    }]);

    if (error) console.error('Resume Logging Error:', error.message);
    else console.log('Resume download logged!');
    
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Local UAParser Error:", err);
    return res.status(500).json({ error: "Server Error" });
  }
});

// --- /api/logs ---
app.get('/api/logs', async (req, res) => {
  const providedSecret = req.headers["x-admin-secret"];

  if (!ADMIN_SECRET || providedSecret !== ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  if (!supabase) {
    return res.status(503).json({ error: "Supabase service is not configured." });
  }

  try {
    const { data, error } = await supabase
      .from("chat_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      throw error;
    }

    return res.status(200).json({ 
      count: data?.length || 0,
      logs: data || []
    });

  } catch (error) {
    console.error("Fetch Logs Error:", error);
    return res.status(500).json({ 
      error: error.message || "Failed to fetch chat logs." 
    });
  }
});

// Static File Serving (for Render)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // SPA Fallback
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('=========================================');
  console.log(`EXPRESS AI ASSISTANT SERVER STARTED`);
  console.log(`Port: http://localhost:${PORT}`);
  console.log(`Supabase URL: ${SUPABASE_URL ? "DETECTED" : "MISSING"}`);
  console.log(`Supabase Key: ${SUPABASE_ANON_KEY ? "DETECTED" : "MISSING"}`);
  console.log(`Client Status: ${supabase ? "READY" : "DATABASE LOGGING DISABLED"}`);
  console.log('=========================================');
});
