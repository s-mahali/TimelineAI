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

const gemini_key = process.env.GEMINI_API_KEY;
if (!gemini_key) {
  throw new Error("gemini key not provided");
}

const tavily_key = process.env.TAVILY_API_KEY;
if (!tavily_key) {
  throw new Error("Tavily API key not provided");
}

// Init the LLM
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: gemini_key,
});

const structuredLLM = llm.withStructuredOutput(TimelineResponseSchema);

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

    // Get the first image from results
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



const generateTimeline = async (query: string) => {
  try {
    const prompt = `Generate a timeline for: "${query}"
Include:
- 5-6 historical events (past milestones, successes, failures)
- 2-3 future predictions (realistic extrapolations)

For each event provide: year, title, description, sentiment, impact score (0-100), market value if applicable, and relevant tags.
For imageUrl, provide a specific descriptive search query that will help find relevant images (e.g., "Virat Kohli 2011 World Cup", "Nokia 3310 phone", "5G technology future").
`;

    const result = await structuredLLM.invoke(prompt);

    // Enhance with real images from Tavily
    const enhancedEvents = await Promise.all(
      result.events.map(async (event) => ({
        ...event,
        imageUrl: await getImageUrl(event.imageUrl || event.title),
      }))
    );

    const finalResult = { ...result, events: enhancedEvents };
    console.log("✅ Timeline Generated:", JSON.stringify(finalResult, null, 2));
    return finalResult;
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

generateTimeline("Einstein scientist journey");