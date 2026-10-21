// Vercel Serverless Function: /api/db.js
// Tự động kết nối với Vercel Storage (Upstash Redis / Vercel KV) hoặc biến môi trường FIREBASE_DATABASE_URL trên Vercel
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const firebaseUrl = process.env.FIREBASE_DATABASE_URL || process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://class1-a7dd4-default-rtdb.asia-southeast1.firebasedatabase.app";

  // Nếu người dùng cấu hình biến môi trường FIREBASE_DATABASE_URL trên Vercel
  if (firebaseUrl && !kvUrl) {
    return res.status(200).json({
      configured: true,
      provider: "Google Firebase Realtime Database",
      firebaseUrl: firebaseUrl
    });
  }

  // Nếu chưa kết nối Vercel Storage (Upstash Redis / KV)
  if (!kvUrl || !kvToken) {
    return res.status(200).json({
      configured: false,
      message: "Chưa kết nối Vercel Storage (Upstash Redis) hoặc FIREBASE_DATABASE_URL trong Vercel Settings."
    });
  }

  const KEY = "a8k59yt_class_state_v6";

  try {
    if (req.method === "GET") {
      const response = await fetch(`${kvUrl.replace(/\/+$/, "")}/get/${KEY}`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      const result = await response.json();
      let parsed = null;
      if (result && result.result) {
        parsed = typeof result.result === "string" ? JSON.parse(result.result) : result.result;
      }
      return res.status(200).json({
        configured: true,
        provider: "Upstash Redis (Vercel Storage)",
        data: parsed
      });
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const payloadStr = JSON.stringify(body.data || {});
      const response = await fetch(`${kvUrl.replace(/\/+$/, "")}/set/${KEY}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json"
        },
        body: payloadStr
      });
      const result = await response.json();
      return res.status(200).json({ ok: true, result });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
