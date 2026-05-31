import { Router } from "express";
import { getStudents, getStudentActionCenter } from "../controllers/studentController";

const router = Router();

router.get("/", getStudents);
router.get("/:id/action-center", getStudentActionCenter);

export default router;
