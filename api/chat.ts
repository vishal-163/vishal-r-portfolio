/* eslint-env node */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `You are "Vishal's AI Assistant", an interactive chatbot on Vishal R's portfolio website.
Vishal is an Aspiring Full Stack Developer from Bangalore, India, graduating in 2027 from K.S. Institute of Technology.
He is available for work/internships. Feel free to encourage contacting him via email (vishalravi163@gmail.com) or LinkedIn (linkedin.com/in/vishal-ravi-653a8a33b).

Technical Skills:
- Frontend: React.js (90%), Next.js (85%), Flutter (75%), Tailwind CSS (90%), HTML/CSS (95%), Framer Motion (70%), shadcn/ui (80%)
- Backend: Node.js (85%), Express.js (80%), REST APIs (88%), JWT Authentication (82%), RBAC (75%), Python (80%)
- Databases: PostgreSQL (85%), Supabase (80%), MySQL (75%)
- AI/ML: OpenAI API (82%), Gemini API (78%), Flask (72%)
- Tools: Git/GitHub (90%), Docker (72%), Vercel (85%), Netlify (80%), VS Code (95%)
- Languages spoken: Telugu (Native), English (Fluent), Kannada (Fluent), Hindi (Fluent), Tamil (Fluent)

Key Projects:
1. AI Trip Planner (Completed): Cross-platform Flutter app using Supabase + OpenAI/Gemini API for travel itineraries.
2. Smart Military Vest (In Progress): Defence-grade IoT wearable system for health monitoring using ESP32, LoRa, GSM.

Guidelines:
- Answer questions about Vishal specifically.
- Keep responses concise (2-3 sentences typically, max 5).
- Be friendly, conversational, and enthusiastic about his projects.
- Show knowledge of both completed and in-progress projects, mentioning specific technologies.
- Be honest about what you don't know.
- End with a question or call-to-action when appropriate.
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

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("API Key Error - check GOOGLE_API_KEY in environment");
    return res.status(500).json({ 
      error: "Authentication error. Please try again later." 
    });
  }

  // Validate request
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  // Limit message history to last 15 messages (token management)
  const limitedMessages = messages.slice(-15);

  // Validate latest message has content
  const latestMessage = limitedMessages[limitedMessages.length - 1];
  if (!latestMessage?.content || typeof latestMessage.content !== "string") {
    return res.status(400).json({ error: "Invalid message content" });
  }

  // Set 30-second timeout for API call
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build chat history format for Gemini API
    const history = limitedMessages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: `System context: ${systemPrompt}` }] },
        { role: "model", parts: [{ text: "Understood! I will act as Vishal's AI Assistant going forward." }] },
        ...history
      ],
      generationConfig: {
        maxOutputTokens: 500,
      }
    });

    // Make the API call, passing the AbortSignal
    const result = await chat.sendMessage(latestMessage.content, { signal: controller.signal });
    const response = await result.response;
    
    // Validate response from Gemini
    if (!response || !response.text) {
      return res.status(500).json({ 
        error: "Invalid response from AI. Please try again." 
      });
    }

    const responseText = response.text().trim();

    if (!responseText) {
      return res.status(500).json({ 
        error: "AI returned empty response. Please try again." 
      });
    }

    return res.status(200).json({ message: responseText });

  } catch (error: unknown) {
    const err = error as any;
    if (err && err.name === "AbortError") {
      clearTimeout(timeoutId);
      return res.status(504).json({ 
        error: "Request timeout. AI service took too long to respond." 
      });
    }

    // Handle rate limiting gracefully
    if (err?.status === 429 || err?.message?.includes("429")) {
      return res.status(429).json({ 
        error: "Too many requests. Please wait a moment before asking again." 
      });
    }

    // Handle API key errors
    if (err?.message?.includes("API key") || err?.message?.includes("authentication")) {
      console.error("API Key Error - check GOOGLE_API_KEY in environment");
      return res.status(500).json({ 
        error: "Authentication error. Please try again later." 
      });
    }
    
    console.error("Gemini API Error:", err);
    return res.status(500).json({ 
      error: "Failed to generate response. Please try again later." 
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
