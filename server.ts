import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// AI Study Assistant endpoint
app.post("/api/ai/study-help", async (req, res) => {
  try {
    const { action, prompt, materialText, subject } = req.body;

    let systemInstruction = "You are a knowledgeable, friendly, and encouraging AI study assistant for university and high school students. Help them understand difficult concepts, summarize notes clearly, and create practice quiz questions.";
    let userPrompt = prompt;

    if (action === "summarize") {
      userPrompt = `Please provide a clear, structured study summary of the following notes for ${subject || " General Studies"}:\n\n${materialText || prompt}`;
    } else if (action === "quiz") {
      userPrompt = `Generate 3 multiple-choice quiz questions based on this topic or text: ${materialText || prompt}. Format clearly with options and the correct answer.`;
    } else if (action === "explain") {
      userPrompt = `Explain this concept simply as if to a student learning it for the first time, using bullet points and examples: ${prompt}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ result: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response." });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
