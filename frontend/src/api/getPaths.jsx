import { api } from "./api.jsx";

export const getPaths = async (email) => {
  try {
    const response = await api.post("/path", { email });

    // Better check: axios errors are usually thrown, not just bad status codes
    if (response.status !== 200) {
      throw new Error(`Unexpected status: ${response.status}`);
    }

    return response?.data; // return actual response body
  } catch (error) {
    console.error("Error sending prompt:", error);
    throw error; // propagate to calling function
  }
};
