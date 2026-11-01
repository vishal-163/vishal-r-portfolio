import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const messages = [
  { role: "system", content: "You are the official AI assistant for Vishal R's portfolio website.\n\nYour purpose is to help visitors learn about Vishal — his background, skills, experience, projects, education, and professional interests." },
  { role: "assistant", "content": "Hi! I'm Vishal's AI Assistant. Ask me anything about his skills, projects, or experience!" },
  { role: "user", content: "why" }
];

async function run() {
  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "qwen/qwen3.8-27b",
      messages,
      max_tokens: 1024,
      temperature: 0.75,
      top_p: 0.9,
    })
  });
  const data = await groqRes.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
