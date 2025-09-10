import { agent } from "../Agent.js";
import { suggestionSchema } from "../../schema/suggestionSchema.js";
import { topicPrompt } from "../prompt/Prompt.js";
import { StructuredOutputParser } from "langchain/output_parsers";
import { HumanMessage } from "@langchain/core/messages";

export const generatePath = async ({ USER_TOPIC, USER_DAYS, USER_HOURS_PER_DAY, USER_EXPERIENCE }) => {
    try {
        const parser = StructuredOutputParser.fromZodSchema(suggestionSchema);

        const prompt = topicPrompt(
            USER_TOPIC,
            USER_DAYS,
            USER_HOURS_PER_DAY,
            USER_EXPERIENCE,
            parser
        );

        const agentFinalState = await agent.invoke(
            { messages: [new HumanMessage(prompt)] },
            { configurable: { thread_id: "42" } }
        );

        const rawContent = agentFinalState.messages[agentFinalState.messages.length - 1]?.content;

        if (!rawContent) {
            throw new Error("No content returned from agent.");
        }

        const parsedJSON = await parser.parse(rawContent);
        return parsedJSON;

    } catch (error) {
        console.error("Error in generatePath:", error.message);
        return {
            success: false,
            error: error.message,
            USER_TOPIC,
            USER_DAYS,
            USER_HOURS_PER_DAY,
            USER_EXPERIENCE
        };
    }
};
