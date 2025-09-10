export const getExtractionPrompt = (userPrompt, parser) => {
    return `
You are a helpful assistant. Extract the user's learning intention from the prompt below.

Return a JSON object with the following fields:
- USER_TOPIC: the main subject the user wants to learn.
- USER_DAYS: number of days they want to spend learning.
- USER_HOURS_PER_DAY: number of hours per day.
- USER_EXPERIENCE: one of "beginner", "refresher", or "professional".

If any field is missing, return null for it.

${parser.formatInstructions}

User prompt:
"""
${userPrompt}
"""
`;

}