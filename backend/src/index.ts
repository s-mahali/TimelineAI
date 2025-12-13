import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as z from "zod";
import { tavily } from "@tavily/core";

//Timeline schema
const TimelineEventSchema = z.object({
  id: z.string(),
  year: z.number(),
  title: z.string(),
  description: z.string(),
  type: z.enum(["historical", "prediction"]),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  impactScore: z.number().min(0).max(100),
  marketValue: z.string().optional(),
  tags: z.array(z.string()),
  imageUrl: z.string().describe("URL for event image"),
});

const TimelineResponseSchema = z.object({
  entity: z.string(),
  events: z.array(TimelineEventSchema),
});

//Intent classification schema
const IntentSchema = z.object({
  intent: z.enum(["timeline", "general_chat"]).describe("User's intent"),
  entity: z.string().optional().describe("Entity name if timeline intent"),
  reasoning: z.string().describe("Brief explanation of classification"),
});

const gemini_key = process.env.GEMINI_API_KEY;
if (!gemini_key) {
  throw new Error("gemini key not provided");
}

const tavily_key = process.env.TAVILY_API_KEY;
if (!tavily_key) {
  throw new Error("Tavily API key not provided");
}

console.log("Hello World!");

// Init the LLM
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: gemini_key,
});

const structuredLLM = llm.withStructuredOutput(TimelineResponseSchema);
const intentLLM = llm.withStructuredOutput(IntentSchema);

// Init Tavily client
const tavilyClient = tavily({ apiKey: tavily_key });

// Helper to fetch image from Tavily Search
const getImageUrl = async (query: string) => {
  console.log("tavily query", query);
  try {
    const response = await tavilyClient.search(query, {
      includeImages: true,
      maxResults: 1,
    });

    const imageUrl = response.images?.[0];

    return (
      imageUrl ||
      `https://placehold.co/600x400/png?text=${encodeURIComponent(query)}`
    );
  } catch (error) {
    console.error("Error fetching image from Tavily:", error);
    return `https://placehold.co/600x400/png?text=${encodeURIComponent(query)}`;
  }
};

// Classify user intent
const classifyIntent = async (query: string) => {
  // Basic sanitization to prevent prompt manipulation
  const sanitizedQuery = query.replace(/["\n\r]/g, ' ').slice(0, 500);
  const prompt = `Analyze this user query and determine the intent:
Query: "${sanitizedQuery}"

Classify as:
- "timeline": If user wants to see history, rise/fall, journey, evolution, timeline, or story of a person/company/entity
- "general_chat": If user is greeting, asking general questions, or having casual conversation

Examples:
- "Show me the rise and fall of Nokia" → timeline
- "How did Virat Kohli become what he is today" → timeline
- "Tell me about the journey of Tesla" → timeline
- "Hi" → general_chat
- "How are you?" → general_chat
- "What can you do?" → general_chat
- current date is ${new Date().toISOString()}
`;


  const result = await intentLLM.invoke(prompt);
  console.log("🎯 Intent:", result);
  return result;
};
// Generate timeline
const generateTimelineData = async (query: string) => {
  const prompt = `Generate a timeline for: "${query}"
Include:
- 5-6 historical events (past milestones, successes, failures)
- 2-3 future predictions (realistic extrapolations)

For each event provide: year, title, description, sentiment, impact score (0-100), market value if applicable, and relevant tags.
For imageUrl, provide a specific descriptive search query that will help find relevant images (e.g., "Virat Kohli 2011 World Cup", "Nokia 3310 phone", "5G technology future").
`;

  const result = await structuredLLM.invoke(prompt);

  // Enhance with real images
  const enhancedEvents = await Promise.all(
    result.events.map(async (event) => ({
      ...event,
      imageUrl: await getImageUrl(event.imageUrl || event.title),
    }))
  );

  return { ...result, events: enhancedEvents };
};

// Handle general chat
const handleGeneralChat = async (query: string) => {
  const prompt = `You are a helpful AI assistant for a timeline generation service.
User said: "${query}"

Respond naturally and mention that you can help create timelines for people, companies, or events.
Keep it brief and friendly.`;

  const response = await llm.invoke(prompt);
  console.log("content",response.content)
  return {
    type: "chat",
    message: response.content,
  };
};

export const generateTimeline = async (query: string) => {
  try {
    const intent = await classifyIntent(query);

    if (intent.intent === "timeline") {
      console.log("📊 Generating timeline...");
      const timeline = await generateTimelineData(query);
      console.log("✅ Timeline Generated");
      return {
        type: "timeline",
        data: timeline,
      };
    } else {
      console.log("💬 Handling general chat...");
      const chat = await handleGeneralChat(query);
      console.log("✅ Chat response generated");
      return chat;
    }
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};
