/* eslint-env node */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<any> {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Security Check
  const adminSecret = process.env.ADMIN_SECRET;
  const providedSecret = req.headers["x-admin-secret"];

  if (!adminSecret || providedSecret !== adminSecret) {
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

  } catch (error: any) {
    console.error("Fetch Logs Error:", error);
    return res.status(500).json({ 
      error: error.message || "Failed to fetch chat logs." 
    });
  }
}
