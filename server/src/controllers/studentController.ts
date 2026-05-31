import { Request, Response } from "express";
import { getActionCenterForStudent, listStudents } from "../services/actionCenterService";

export function getStudents(req: Request, res: Response) {
    res.json({ students: listStudents() });
}

export function getStudentActionCenter(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const payload = getActionCenterForStudent(id);

    if (!payload) {
        return res.status(404).json({ error: "Student not found" });
    }

    return res.json(payload);
}
