import { app } from "./app.js"
import { connectDB } from "./config/connect.js";
import { PORT } from "./schema/portSchema.js";

const startServer = async () => {
    await connectDB();
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
        console.log(`Visit at: http://localhost:${PORT}`);
    });
};

startServer();
