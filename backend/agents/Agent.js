import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

// LLM config
const agentModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  maxRetries: 3,
  apiKey: process.env.GOOGLE_API_KEY
});

// Memory
const agentCheckpointer = new MemorySaver();

// Agent
export const agent = createReactAgent({
  llm: agentModel,
  tools: [],
  checkpointSaver: agentCheckpointer
});

