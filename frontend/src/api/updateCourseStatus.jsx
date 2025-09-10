import { api } from "./api.jsx";

export const updateCourseStatus = async ({ courseId }) => {
    try {
        const response = await api.post("/path/updateStatus", { courseId });
    
        // Check if the response is successful
        if (response.status !== 200) {
        throw new Error(`Unexpected status: ${response.status}`);
        }
    
        return response?.data; // return actual response body
    } catch (error) {
        console.error("Error updating course status:", error);
        throw error; // propagate to calling function
    }
}