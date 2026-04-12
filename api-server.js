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

const GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
const SUPABASE_URL = env.SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

const PORT = 3001;

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

  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { messages } = JSON.parse(body);
        
        if (!GROQ_API_KEY) {
          console.error("Missing GROQ_API_KEY");
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "GROQ_API_KEY missing in .env.local" }));
          return;
        }

        console.log('--- Calling Groq API ---');
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "system", content: "You are Vishal's Assistant." }, ...messages.slice(-10)],
            max_tokens: 500
          })
        });

        const data = await groqRes.json();
        const responseText = data.choices?.[0]?.message?.content || "";

        if (responseText) {
          console.log('Got response from Groq');
          // Log to Supabase (non-blocking)
          if (supabase) {
            const lastUserMessage = messages[messages.length - 1]?.content || "";
            supabase.from('chat_logs').insert([{ message: lastUserMessage, response: responseText }])
              .then(({ error }) => { if (error) console.error("Supabase Log error:", error); else console.log("Logged to Supabase"); });
          }
          
          res.statusCode = 200;
          res.end(JSON.stringify({ message: responseText }));
        } else {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Empty response from AI" }));
        }
      } catch (err) {
        console.error("Local API Server Error:", err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Internal Server Error", details: err.message }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log('=========================================');
  console.log(`🚀 API SERVER SUCCESSFULLY STARTED`);
  console.log(`📍 Port: http://localhost:${PORT}`);
  console.log(`📊 Logging: ${supabase ? "ACTIVE" : "DISABLED"}`);
  console.log('=========================================');
});
