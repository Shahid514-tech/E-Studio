import { getPaths } from "../models/getPaths.js";
import { updateCourseStatus } from "../models/updateStatus.js";

export const PathController = async (req, res) => {
    try {
        const email = req.body?.email;

        if (!email || typeof email !== "string") {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email.",
            });
        }

        const result = await getPaths(email);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve paths.",
                error: result.error,
            });
        }

        return res.status(200).json({
            success: true,
            count: result.data.length,
            paths: result.data,
        });
    } catch (error) {
        console.error("Error in PathController:", error.message);

        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching learning paths.",
            error: error.message,
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId || typeof courseId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid course ID.",
            });
        }

        // Logic to update the course status in the database
        // This is a placeholder; actual implementation will depend on your database setup
        const updated = await updateCourseStatus(courseId);

        if (!updated) {
            return res.status(500).json({
                success: false,
                message: "Failed to update course status.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course status updated successfully.",
        });
    } catch (error) {
        console.error("Error in updateStatus:", error.message);

        return res.status(500).json({
            success: false,
            message: "An error occurred while updating course status.",
            error: error.message,
        });
    }
}
