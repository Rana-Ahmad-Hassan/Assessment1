import { Request, Response } from "express";
import { updateTaskStatus } from "../services/actionCenterService";

export function patchTaskStatus(req: Request, res: Response) {
    const { taskId } = req.params as { taskId: string };
    const { status } = req.body as { status?: string };

    if (!status) {
        return res.status(400).json({ error: "Missing status" });
    }

    const task = updateTaskStatus(taskId, status);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ task });
}
