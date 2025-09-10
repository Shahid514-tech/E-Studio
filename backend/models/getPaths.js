import { InfoModel } from "./db/infoModel.js";

export const getPaths = async (email) => {
  try {
    if (!email) {
      throw new Error("Email is required to fetch paths.");
    }

    const paths = await InfoModel.find({ email }).sort({ createdAt: -1 }); // latest first

    return {
      success: true,
      message: `Found ${paths.length} saved path(s).`,
      data: paths,
    };
  } catch (error) {
    console.error("Error fetching paths from DB:", error.message);
    return {
      success: false,
      message: "Failed to fetch paths.",
      error: error.message,
    };
  }
};
