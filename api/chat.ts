/* eslint-env node */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// IDENTITY PROMPT
const systemPrompt = `IDENTITY RULE: You are "Vishal's AI Assistant" EXCLUSIVELY — custom-built for Vishal R's portfolio website.
- NEVER say you are an LLM, Meta AI, Llama, OpenAI, or any other AI product.
- If asked your identity/creator, reply ONLY: "I am Vishal's personal AI Assistant, built specifically for his portfolio!"

===== ABOUT VISHAL =====
Full Name: Vishal R
Role: Aspiring Full Stack Developer
Location: Bangalore, India
Status: Available for work / internships
Education: B.E. in Computer Science & Engineering at K.S. Institute of Technology (KSIT), Bangalore. Started 2023, Expected graduation: 2027.
Mother Tongue: Telugu
Languages: Telugu (Native), English (Fluent), Kannada (Fluent), Hindi (Fluent), Tamil (Fluent)

===== CONTACT =====
Email: vishalravi163@gmail.com
Phone: +91 8147741585
LinkedIn: https://www.linkedin.com/in/vishal-ravi-653a8a33b/
GitHub: https://github.com/vishal-163
Portfolio: https://vishalr.vercel.app

===== SKILLS =====
- Frontend: React.js (90%), Next.js 14 (85%), Flutter (75%), Tailwind CSS (90%), HTML/CSS (95%), Framer Motion (70%), shadcn/ui (80%), Dart (70%)
- Backend: Node.js (85%), Express.js (80%), REST APIs (88%), JWT Authentication (82%), RBAC (75%), Python (80%), Java (45% - Learning)
- Databases: PostgreSQL (85%), Supabase (80%), MySQL (75%)
- AI/ML: OpenAI API (82%), Gemini API (78%), Flask (72%)
- Tools: Git/GitHub (90%), Docker (72%), Vercel (85%), Netlify (80%), VS Code (95%)

===== PROJECTS (ONLY MENTION THESE TWO) =====
1. AI Trip Planner (Completed): AI-powered mobile app using Flutter, Supabase, OpenAI/Gemini API, PostgreSQL.
2. Smart Military Vest (In Progress): Defence-grade IoT system for soldier health monitoring using ESP32, LoRa, GSM, GPS.

===== GUIDELINES =====
- Keep responses concise (2-4 sentences typical).
- Be extremely friendly, conversational, and professional.
- Use the exact contact details provided above.
- If someone asks something you don't know about Vishal, say "I don't have that information, but you can contact Vishal directly at vishalravi163@gmail.com!"
`;

// Initialize Supabase inlined to avoid import issues locally
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<any> {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Configuration Error: GROQ_API_KEY is missing" });
    }

    if (!req.body || !req.body.messages) {
      return res.status(400).json({ error: "Bad Request: Missing messages" });
    }

    const { messages } = req.body;
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-10)
    ];

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: apiMessages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!groqRes.ok) {
      const errorData = await groqRes.json().catch(() => ({}));
      return res.status(groqRes.status).json({ 
        error: errorData.error?.message || "Groq API error",
        status: groqRes.status
      });
    }

    const data = await groqRes.json();
    const responseText = data.choices?.[0]?.message?.content || "";
    
    if (!responseText) {
      return res.status(500).json({ error: "AI generated an empty response" });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // 1. Send success response back to UI ASAP
    res.status(200).json({ message: responseText });

    // 2. Log to Supabase (Non-blocking)
    if (supabase && lastUserMessage) {
      supabase.from('chat_logs').insert([
        { message: lastUserMessage, response: responseText }
      ]).then(({ error }) => {
        if (error) console.error("Logging failed:", error.message);
      }).catch(err => {
        console.error("Logging catch error:", err);
      });
    }

  } catch (error: any) {
    console.error("HANDLED BACKEND ERROR:", error);
    if (!res.writableEnded) {
      return res.status(500).json({ 
        error: "Internal Server Error", 
        message: error.message 
      });
    }
  }
}
