import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { generateTgsAiAnswer, ChatMessage } from "./src/utils/tgsAiEngine.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: "25mb" }));

  // Helper to get Gemini Client if API key is present
  const getGeminiClient = () => {
    if (!process.env.GEMINI_API_KEY) return null;
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Helper to format system prompt for TGS AI
  const getSystemInstruction = (mode: string = "general") => {
    let modeGuidance = "You are TGS AI, the official intelligent conversational co-pilot created by Tanishq Gaming Studios.";
    if (mode === "gamedev") {
      modeGuidance += " Focus on game development architecture, Unity (C#), Unreal Engine 5 (C++/Blueprints), Godot 4 (GDScript), WebGL, shader optimization, and game math.";
    } else if (mode === "code") {
      modeGuidance += " Focus on computer science, full-stack software development, algorithms, clean code patterns, performance profiling, and debugging.";
    } else if (mode === "creative") {
      modeGuidance += " Focus on game concept design, worldbuilding, narrative quest arcs, level layouts, audio scoring, and character design.";
    } else {
      modeGuidance += " Provide smart, thorough, accurate, and structured answers across game design, programming, math, science, and creative technology.";
    }
    return modeGuidance;
  };

  // POST /api/ai/chat/stream
  app.post("/api/ai/chat/stream", async (req, res) => {
    try {
      const body = req.body || {};
      const message = typeof body.message === "string" ? body.message : "";
      const history = Array.isArray(body.history) ? body.history : [];
      const mode = typeof body.mode === "string" ? body.mode : "general";
      const attachments = Array.isArray(body.attachments) ? body.attachments : [];

      req.socket?.setNoDelay(true);
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.flushHeaders?.();

      const client = getGeminiClient();

      if (client) {
        try {
          // Build contents for Gemini API
          const contents: any[] = [];

          // Add history
          for (const item of history.slice(-8)) {
            contents.push({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.content || "" }],
            });
          }

          // Current user message parts
          const currentParts: any[] = [];

          // Check for attached images
          for (const att of attachments) {
            if (att.dataUrl && typeof att.dataUrl === "string" && att.dataUrl.includes(";base64,")) {
              const [meta, base64Data] = att.dataUrl.split(";base64,");
              const mimeType = meta.replace("data:", "") || "image/png";
              currentParts.push({
                inlineData: {
                  mimeType,
                  data: base64Data,
                },
              });
            } else if (att.textContent) {
              currentParts.push({
                text: `[Attached File: ${att.name || "file"}]:\n${att.textContent}`,
              });
            }
          }

          currentParts.push({ text: message || "Hello" });
          contents.push({
            role: "user",
            parts: currentParts,
          });

          const systemInstruction = getSystemInstruction(mode);

          const responseStream = await client.models.generateContentStream({
            model: "gemini-3.8-flash",
            contents,
            config: {
              systemInstruction,
            },
          });

          let accumulated = "";
          for await (const chunk of responseStream) {
            const chunkText = chunk.text || "";
            if (chunkText) {
              accumulated += chunkText;
              res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
            }
          }

          res.write(`data: ${JSON.stringify({ done: true, full: accumulated })}\n\n`);
          res.end();
          return;
        } catch (geminiError) {
          console.warn("Gemini streaming error, falling back to TGS AI local engine:", geminiError);
          // Fall through to streaming local answer
        }
      }

      // Local TGS Engine fallback (streaming response in rapid slices)
      const localAnswer = generateTgsAiAnswer(message, history as ChatMessage[], mode);
      const step = 60;
      for (let i = 0; i < localAnswer.length; i += step) {
        const slice = localAnswer.slice(i, i + step);
        res.write(`data: ${JSON.stringify({ chunk: slice })}\n\n`);
      }
      res.write(`data: ${JSON.stringify({ done: true, full: localAnswer })}\n\n`);
      res.end();
    } catch (err) {
      console.error("Fatal in /api/ai/chat/stream:", err);
      try {
        const localAnswer = generateTgsAiAnswer(req.body?.message || "", [], req.body?.mode || "general");
        res.write(`data: ${JSON.stringify({ chunk: localAnswer, done: true, full: localAnswer })}\n\n`);
        res.end();
      } catch (innerErr) {
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to generate stream" });
        } else {
          res.end();
        }
      }
    }
  });

  // POST /api/ai/chat (JSON non-streaming endpoint)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const body = req.body || {};
      const message = typeof body.message === "string" ? body.message : "";
      const history = Array.isArray(body.history) ? body.history : [];
      const mode = typeof body.mode === "string" ? body.mode : "general";
      const attachments = Array.isArray(body.attachments) ? body.attachments : [];

      const client = getGeminiClient();

      if (client) {
        try {
          const contents: any[] = [];
          for (const item of history.slice(-8)) {
            contents.push({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.content || "" }],
            });
          }

          const currentParts: any[] = [];
          for (const att of attachments) {
            if (att.dataUrl && typeof att.dataUrl === "string" && att.dataUrl.includes(";base64,")) {
              const [meta, base64Data] = att.dataUrl.split(";base64,");
              const mimeType = meta.replace("data:", "") || "image/png";
              currentParts.push({
                inlineData: {
                  mimeType,
                  data: base64Data,
                },
              });
            } else if (att.textContent) {
              currentParts.push({
                text: `[Attached File: ${att.name || "file"}]:\n${att.textContent}`,
              });
            }
          }

          currentParts.push({ text: message || "Hello" });
          contents.push({
            role: "user",
            parts: currentParts,
          });

          const systemInstruction = getSystemInstruction(mode);
          const response = await client.models.generateContent({
            model: "gemini-3.8-flash",
            contents,
            config: {
              systemInstruction,
            },
          });

          const reply = response.text || generateTgsAiAnswer(message, history as ChatMessage[], mode);
          res.json({ reply });
          return;
        } catch (geminiError) {
          console.warn("Gemini non-streaming error, falling back to TGS AI local engine:", geminiError);
        }
      }

      const reply = generateTgsAiAnswer(message, history as ChatMessage[], mode);
      res.json({ reply });
    } catch (err) {
      console.error("Fatal in /api/ai/chat:", err);
      const reply = generateTgsAiAnswer(req.body?.message || "", [], req.body?.mode || "general");
      res.json({ reply });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      studio: "Tanishq Gaming Studios",
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // Mount Vite middleware in development or serve static in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TGS AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start TGS AI Server:", err);
  process.exit(1);
});
