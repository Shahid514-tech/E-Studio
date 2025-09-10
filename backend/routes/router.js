import { Router } from "express";
import { PromptController } from "../controllers/PromptController.js";
import { PathController, updateStatus } from "../controllers/PathController.js";

export const router = Router();

router.post("/prompt", PromptController);

router.post("/path", PathController);

router.post("/path/updateStatus", updateStatus);