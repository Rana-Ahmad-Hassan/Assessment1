import { students, tasks, messages } from "../mockData";
import type { ActionCenterPayload, Task } from "../models/types";

export function listStudents() {
    return students;
}

export function getActionCenterForStudent(id: string): ActionCenterPayload | null {
    const student = students.find((s) => s.id === id);
    if (!student) return null;

    const studentTasks = tasks.filter((t) => t.studentId === id);
    const studentMessages = messages.filter((m) => m.studentId === id);
    const unreadCount = studentMessages.reduce((count, m) => count + (!m.read ? 1 : 0), 0);
    const urgencyCounts = studentTasks.reduce<Record<string, number>>((acc, t) => {
        acc[t.priority] = (acc[t.priority] || 0) + 1;
        return acc;
    }, {});

    return { student, tasks: studentTasks, messages: studentMessages, unreadCount, urgencyCounts };
}

export function updateTaskStatus(taskId: string, status: string): Task | null {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return null;

    task.status = status;
    task.updatedAt = new Date().toISOString();
    return task;
}
