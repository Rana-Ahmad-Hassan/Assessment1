import { Router } from "express";
import { patchTaskStatus } from "../controllers/taskController";

const router = Router();

router.patch("/:taskId/status", patchTaskStatus);

export default router;
