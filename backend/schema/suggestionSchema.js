import { z } from "zod";

export const suggestionSchema = z.object({
  courseName: z.string().describe("A Modern yet Professional Short Title for Course"),
  description: z.string().describe("A Short Description of Course (Minimum 2-3 Lines)"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).describe("describes Level of Course as per user experience and course content"),
  summary: z.object({
    total_hours_required: z.number().describe("Total time required in hours to complete all topics in the learning plan."),
    user_total_available_hours: z.number().describe("Total study hours available to the user (days x hours_per_day)."),
    fits_in_schedule: z.boolean().describe("Whether the plan fits within the user's available hours.")
  }),
  schedule: z.record(
    z.string().describe("Day label (e.g., 'Day 1', 'Day 2')"),
    z.array(
      z.object({
        phaseId: z.string().describe("Unique identifier for the learning phase."),
        phase: z.string().describe("The learning phase this topic belongs to."),
        phaseSummary: z.string().describe("Summary of the learning phase."),
        topic: z.string().describe("The topic title."),
        estimated_time: z.string().describe("Rough time needed to learn this topic, like '2 hours' or '1 day'."),
        difficulty: z.string().describe("Difficulty level of the topic, e.g., 'beginner', 'intermediate', 'advanced'."),
        skillsLearned: z.array(z.string()).describe("List of skills or concepts learned in this topic."),
        type: z
          .enum(["tool", "concept", "pattern", "project", "framework", "language", "library", "practice", "other"])
          .describe("The nature of the topic (e.g., concept, tool, project, pattern, etc.)."),
        importance: z
          .enum(["core", "optional", "advanced"])
          .describe("How essential the topic is to the learning goal."),
        isCompleted: z.boolean().default(false),
        materials: z.array(z.string())
      })
    )
  ),
  suggestion: z
    .string()
    .optional()
    .describe("Appears only if the schedule does not fit the user's time. Suggests trimming topics or increasing duration."),
  isCourseCompleted: z.boolean().default(false),
  isCourseStarted: z.boolean().default(false)
});
