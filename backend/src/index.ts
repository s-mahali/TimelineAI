import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { MessagesAnnotation } from "@langchain/langgraph";
import { z } from "zod";

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
});

const TimelineResponseSchema = z.object({
  entity: z.string(),
  events: z.array(TimelineEventSchema),
});

// Init the LLM
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const structuredLLM = llm.withStructuredOutput(TimelineResponseSchema);

const generateTimeline = async (query: string) => {
  try {
    const prompt = `Generate a timeline for: "${query}"
        Include:
- 5-6 historical events (past milestones, successes, failures)
- 2-3 future predictions (realistic extrapolations)
For each event provide: year, title, description, sentiment, impact score (0-100), market value if applicable, and relevant tags.
        `;

    const result = await structuredLLM.invoke(prompt);
    console.log("Timeline Generated:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

//
generateTimeline("How did Virat Kohli become what he is today");
