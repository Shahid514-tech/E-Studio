import { z } from 'zod';

export const extractionSchema = z.object({
    USER_TOPIC: z.string().describe("Describes the main topic that user want to learn."),
    USER_DAYS: z.number().describe("Number of days to learn the topic."),
    USER_HOURS_PER_DAY: z.number().describe("Number of Hours per day."),
    USER_EXPERIENCE: z.enum(["beginner", "refresher", "professional"]).describe("The Level of Experience of user.")
});
