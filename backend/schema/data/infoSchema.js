import mongoose from "mongoose";

export const infoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    extracted: {
      USER_TOPIC: { type: String, required: true },
      USER_DAYS: { type: Number, required: true },
      USER_HOURS_PER_DAY: { type: Number, required: true },
      USER_EXPERIENCE: {
        type: String,
        enum: ["beginner", "refresher", "professional"],
        required: true,
      },
    },
    path: {
      courseName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: [
          "Beginner",
          "Intermediate",
          "Advanced",
        ],
      },
      summary: {
        total_hours_required: Number,
        user_total_available_hours: Number,
        fits_in_schedule: Boolean,
      },
      schedule: {
        type: Map,
        of: [
          {
            phaseId: String,
            phase: String,
            phaseSummary: String,
            topic: String,
            estimated_time: String,
            difficulty: String,
            skillsLearned: [String],
            type: {
              type: String,
              enum: [
                "tool",
                "concept",
                "pattern",
                "project",
                "framework",
                "language",
                "library",
                "practice",
                "other",
              ],
            },
            importance: {
              type: String,
              enum: ["core", "optional", "advanced"],
            },
            isCompleted: {
              type: Boolean,
              default: false,
            },
            materials: {
              type: [String],
              default: [],
            },
          },
        ],
      },
      suggestion: String,
      isCourseCompleted: {
        type: Boolean,
        default: false,
      },
      isCourseStarted: {
        type: Boolean,
        default: false,
      }
    },
  },
  {
    timestamps: true,
  }
);


