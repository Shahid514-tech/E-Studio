import { InfoModel } from "./db/infoModel.js";

export const addPath = async ({ email, prompt, parsedPrompt, generatedPath }) => {
    try {
        const saved = await InfoModel.create({
            email,
            prompt,
            extracted: parsedPrompt,
            path: generatedPath,
        });

        console.log("Path successfully saved to DB:", saved._id);

        return {
            success: true,
            message: "Learning path saved successfully.",
            data: saved,
        };
    } catch (error) {
        console.error("Error saving path to DB:", error.message);

        return {
            success: false,
            message: "Failed to save learning path.",
            error: error.message,
        };
    }
};
