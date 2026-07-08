import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { UAParser } from "ua-parser-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "https://vishalr.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!supabase) {
    return res.status(500).json({ error: "Supabase configuration missing" });
  }

  try {
    const userAgentStr = req.headers["user-agent"] || "";
    const parser = new UAParser(userAgentStr);
    const os = parser.getOS();
    const browser = parser.getBrowser();
    const deviceOs = `${os.name || 'Unknown OS'} ${os.version || ''}`.trim();
    const browserName = `${browser.name || 'Unknown Browser'} ${browser.version || ''}`.trim();

    const city = req.headers["x-vercel-ip-city"] || "Unknown City";
    const region = req.headers["x-vercel-ip-country-region"] || "";
    const country = req.headers["x-vercel-ip-country"] || "Unknown Country";
    const location = region ? `${city}, ${region}, ${country}` : `${city}, ${country}`;

    const localTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    });

    const { error } = await supabase.from('resume_downloads').insert([
      {
        device_os: deviceOs,
        browser: browserName,
        location: location,
        local_time: localTime
      }
    ]);

    if (error) {
      console.error("❌ Resume tracking failed:", error.message);
      return res.status(500).json({ error: "Failed to log download" });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("❌ Backend Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
