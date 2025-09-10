import { agent } from "../Agent.js";
import { StructuredOutputParser } from "langchain/output_parsers";
import { HumanMessage } from "@langchain/core/messages";
import { extractionSchema } from "../../schema/extractionSchema.js";
import { getExtractionPrompt } from "../prompt/ExtractionPrompt.js";

export const handlePrompt = async (prompt) => {
    try {
        const parser = StructuredOutputParser.fromZodSchema(extractionSchema);

        const extractionPrompt = getExtractionPrompt(prompt, parser);

        const agentFinalState = await agent.invoke(
            { messages: [new HumanMessage(extractionPrompt)] },
            { configurable: { thread_id: "42" } }
        );

        const rawContent = agentFinalState.messages[agentFinalState.messages.length - 1]?.content;

        if (!rawContent) {
            throw new Error("No content returned from agent.");
        }

        const parsedJSON = await parser.parse(rawContent);

        return parsedJSON;
    } catch (error) {
        console.error("Error in handlePrompt:", error.message);
        return {
            USER_TOPIC: null,
            USER_DAYS: null,
            USER_HOURS_PER_DAY: null,
            USER_EXPERIENCE: null,
            error: error.message
        };
    }
};
