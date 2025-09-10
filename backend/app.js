import express from "express";
import cors from "cors";
import { router } from "./routes/router.js";
import { ErrorHandler } from "./controllers/ErrorController.js";

export const app = express();

const corsOptions = {
    origin: process.env.API_ORIGIN_URL,
    optionsSuccessStatus: 200,
    credentials: true
};

const CORS = cors(corsOptions);

// CORS Configuration Middleware for Server
app.use(CORS);

// Hadles JSON Requests
app.use(express.json());

// Middleware to parse incoming URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Use the imported router to handle application routes
app.use(router);

// 404 Error handler for unknown routes
app.use(ErrorHandler);

