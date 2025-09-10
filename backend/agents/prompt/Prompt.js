export const topicPrompt = (
  USER_TOPIC,
  USER_DAYS,
  USER_HOURS_PER_DAY,
  USER_EXPERIENCE = "beginner", // default value
  parser
) => {
  const TOTAL_HOURS = USER_DAYS * USER_HOURS_PER_DAY;

  return `
The user wants to learn about "${USER_TOPIC}" and has selected "${USER_EXPERIENCE}" as their experience level.

Their availability:
- Days to complete: ${USER_DAYS}
- Hours per day: ${USER_HOURS_PER_DAY}
- Total available time: ${TOTAL_HOURS} hours

Your task:
1. Break the learning path into clearly labeled phases (e.g., "Fundamentals", "Core Concepts", "Advanced Topics", etc.)
2. Each phase should include 3-7 topics. Each topic must include:
   - "topic": string - The name of the concept
   - "description": string - A short explanation of what it covers
   - "estimated_time": string - Time to learn (e.g., "2 hours", "1 day")
   - "dificulty": string - Difficulty level of topic as per user experience level (e.g., "beginner", "intermediate", "advanced")

3. Based on the user's experience level:
   - If "beginner", include foundational topics (e.g., basic tools, theory, syntax, setup)
   - If "intermediate" or "refresher", assume they know the basics and focus on applying core skills
   - If "advanced" or "professional", skip basics and focus on optimization, architecture, testing, etc.
   - If unsure, make reasonable assumptions and provide a balanced plan

4. Optionally include a "Capstone Project" phase at the end **only if the topic naturally supports it** (e.g., coding, design, product-based topics).
   - If not relevant, skip the capstone phase entirely

5. Build a suggested study **schedule** using the user's available time. Format:
{
  "summary": {
    "total_hours_required": number,
    "user_total_available_hours": number,
    "fits_in_schedule": boolean
  },
  "schedule": {
    "Day 1": [ { phase, topic, estimated_time }, ... ],
    ...
  },
  "suggestion": string (optional - only if plan exceeds available time)
}

Guidelines:
- Do not exceed ${USER_HOURS_PER_DAY} hours per day in any schedule day
- If time required > total available, return an optimized version and explain changes in the "suggestion" field
- If it fits within time, omit the "suggestion" field
- If a concept requires multiple sessions to complete, split it into clearly labeled parts (e.g., "JavaScript Fundamentals - Part 1", "JavaScript Fundamentals - Part 2")
- Never use the same topic name more than once — always append "Part X" or another unique identifier
- Group multi-part topics consecutively across days and ensure the total time for the concept is still accurate
- Use clear and concise language
- Calculate correct difficulty levels for each topic based on user experience
- Phase ID for each phase must be a unique identifier (e.g., "phase1", "phase2", etc.)

Respond ONLY with valid JSON matching the schema below:

${parser.getFormatInstructions()}

Constraints:
- Use valid JSON only (no markdown, no commentary)
- Use double quotes
- Output must be directly parsable with JSON.parse()
`;
};
