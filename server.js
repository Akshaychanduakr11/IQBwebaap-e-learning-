import Groq from "groq-sdk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ override: true });  // load env FIRST
console.log("GROQ KEY:", process.env.GROQ_API_KEY); // THEN log
import path from "path";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";


const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// 🧩 MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// ==========================
// 🌐 FRONTEND ROUTE
// ==========================
app.get("/", (req, res) => {
  res.sendFile(path.resolve("qb.html"));
});

// ==========================
// 🔑 API KEY CHECK
// ==========================
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env file");
} else {
  console.log("✅ GEMINI KEY LOADED");
}

// ==========================
// 🤖 GEMINI SETUP
// ==========================
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// ==========================
// 🔐 RATE LIMIT
// ==========================
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests, slow down." }
});

// ==========================
// 🔄 RETRY FUNCTION (for 503 errors)
// ==========================
async function getAIResponse(contents) {
  try {
    // 🔵 TRY GEMINI FIRST
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents
    });

    return result.text;

  } catch (err) {
    console.log("⚠️ Gemini failed, switching to Groq...");

    try {
      // 🟢 GROQ BACKUP
      const response = await groq.chat.completions.create({
 model: "llama-3.1-8b-instant",
  messages: contents.map(c => ({
    role: c.role === "model" ? "assistant" : "user",
    content: c.parts[0].text
  }))
});

return response.choices[0].message.content;

    } catch (err2) {
      console.log("❌ GROQ ERROR:", err2);

      return "⚠️ AI is currently unavailable. Please try again later.";
    }
  }
}

// ==========================
// 💬 CHAT API
// ==========================
app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    const { history, userName } = req.body;

    // ✅ validate input
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const name = userName || "";

    const systemPrompt = `
You are an AI chatbot for a Question Bank website.

IMPORTANT RULES:
- Your name is "Ai Chatbot"
- You must ALWAYS introduce yourself as "Ai Chatbot"
- Never use any other name like Ada, Nova, Gemini, etc.
- If user asks your name, reply: "I am Ai Chatbot"
- Created by Aditya & CO's
- Be simple, helpful, and focused on studies


${name ? `User name is ${name}. Use it naturally.` : ""}
`;

    // ✅ add system prompt + memory
    const fullHistory = [
      {
        role: "user",
        parts: [{ text: systemPrompt + "\n\nStart conversation." }]
      },
      ...history
    ];

    // ✅ limit memory (IMPORTANT)
    const limitedHistory = fullHistory.slice(-10);

    // ✅ call AI with retry
   const reply = await getAIResponse(limitedHistory);
    res.json({ reply });

  } catch (err) {
    console.log("❌ ERROR:", err);

    res.status(500).json({
      error: "AI failed",
      details: err.message
    });
  }
});

// ==========================
// 🚀 START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});