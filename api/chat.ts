/* eslint-env node */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase";

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
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

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("API Key Error - check GROQ_API_KEY in environment");
    return res.status(500).json({ 
      error: "AI service configuration error. Please try again later." 
    });
  }

  // Validate request
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  // Prepend system prompt to the messages
  const apiMessages = [
    { role: "system", content: systemPrompt },
    ...messages.slice(-15) // Limit history for token management
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);
      throw new Error(data.error?.message || "Failed to get response from Groq");
    }

    const responseText = data.choices?.[0]?.message?.content || "";

    if (!responseText) {
      return res.status(500).json({ 
        error: "AI returned empty response. Please try again." 
      });
    }

    // Capture the last user message for logging
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // Respond to user immediately
    res.status(200).json({ message: responseText });

    // Log to Supabase asynchronously (non-blocking for the user response)
    try {
      if (supabase && lastUserMessage && responseText) {
        await supabase.from('chat_logs').insert([
          { message: lastUserMessage, response: responseText }
        ]);
      }
    } catch (logError) {
      // Fail silently to the user, but log for developer
      console.error("Supabase Logging Error:", logError);
    }

  } catch (error: any) {
    console.error("API Route Error:", error);
    if (!res.writableEnded) {
      return res.status(500).json({ 
        error: error.message || "Failed to generate response. Please try again later." 
      });
    }
  }
}
