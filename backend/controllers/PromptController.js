import { generatePath } from "../agents/tools/generatePath.js";
import { handlePrompt } from "../agents/tools/handlePrompt.js";
import { addPath } from "../models/addPath.js"

export const PromptController = async (req, res) => {
    try {
        const { prompt, email } = req.body;

        if (!prompt || typeof prompt !== "string" || !email) {
            return res.status(400).json({
                success: false,
                message: "Missing or invalid 'prompt' or 'email' in request body.",
            });
        }

        const parsedPrompt = await handlePrompt(prompt);
        const generatedPath = await generatePath(parsedPrompt);

        const dbResult = await addPath({
            email,
            prompt,
            parsedPrompt,
            generatedPath,
        });

        if (!dbResult.success) {
            return res.status(500).json({
                success: false,
                message: "Failed to save learning path to database.",
                error: dbResult.error,
            });
        }

        return res.status(200).json({
            success: true,
            id: dbResult.data._id
        });
    } catch (error) {
        console.error("Error in PromptController:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while processing the prompt.",
            error: error.message,
        });
    }
};
