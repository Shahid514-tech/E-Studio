import { InfoModel } from "./db/infoModel.js";

export const updateCourseStatus = async (courseId) => {
    try {
        if (!courseId) {
            throw new Error("Course ID is required to update status.");
        }

        // Logic to update the course status in the database
        // This is a placeholder; actual implementation will depend on your database setup
        const result = await InfoModel.updateOne(
            { _id: courseId },
            { $set: { "path.isCourseStarted": true } }
        );

        if (result.modifiedCount === 0) {
            throw new Error("Failed to update course status.");
        }

        return true;
    } catch (error) {
        console.error("Error updating course status:", error.message);
        return false;
    }
}