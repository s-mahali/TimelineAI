import express from "express";
import cors from "cors";
import { generateTimeline, generateTimelineStream } from "./index";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://timeline-seedhecode.vercel.app/",
  "https://timelineai-eta.vercel.app/"
]
app.use(cors({
  origin: allowedOrigins
}));


app.get("/health", (req, res) => {
  res.json({
    message: "OK",
    date: new Date().toLocaleDateString(),
  });
});

//keep for backup
app.post("/chat", async (req, res) => {
  const query: string = typeof req.body?.query === 'string' ? req.body.query.trim() : "";

  console.log("🎯 Query:", query);
  try {
    if (!query) {
      return res.status(400).json({
        payload: null,
        message: "Query is required",
        success: false,
      });
    }
    const result = await generateTimeline(query);    
    if (result) {
      console.log("result", JSON.stringify(result, null, 2))
      return res.status(200).json({
        payload: result,
        message: result.type === "timeline" ? "✅ generated timeline successfully":"✅ response generated",
        type: result.type === "timeline" ? "timeline" : "general",
        success: true,
      });
    } else {
      return res.status(500).json({
        payload: null,
        message: "Sorry, couldn't process your request. Please try again 😇",
        success: false,
      });    }
  } catch (error) {
    console.log("❌ error while processing request", error);
    return res.status(500).json({
      payload: null,
      message: "❌ Internal server error",
      success: false,
    });
  }
});

// SSE endpoint for streaming timeline generation
app.get("/chat/stream", async (req, res) => {
  const query: string = typeof req.query?.query === 'string' ? req.query.query.trim() : "";

  console.log("SSE Query:", query);

  if (!query) {
    res.status(400).json({
      payload: null,
      message: "Query is required",
      success: false,
    });
    return;
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Send initial event
    res.write(`data: ${JSON.stringify({ type: 'start', message: 'Analyzing your query...' })}\n\n`);

    // Stream timeline generation
    await generateTimelineStream(query, (event) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    // Send completion event
    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
    res.end();
  } catch (error) {
    console.log("❌ SSE error:", error);
    res.write(`data: ${JSON.stringify({ 
      type: 'error', 
      message: 'Internal server error' 
    })}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
