import mongoose from "mongoose";
import { infoSchema } from "../../schema/data/infoSchema.js";

// Export model
export const InfoModel = mongoose.model("Info", infoSchema);