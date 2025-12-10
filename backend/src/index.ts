import {ChatGoogleGenerativeAI} from "@langchain/google-genai"

// Init the LLM
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY

})

const testLLM = async () => {
    try {
        const result = await llm.invoke("hi");
        console.log("✅ LLM Response:", result.content);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

testLLM();