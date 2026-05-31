export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchActionCenter(studentId: string) {
    const res = await fetch(`${API_BASE}/students/${studentId}/action-center`);
    if (!res.ok) throw new Error('Failed to load action center');
    return res.json();
}

export async function updateTaskStatus(taskId: string, status: string) {
    const res = await fetch(`${API_BASE}/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
}

export async function fetchStudents() {
    const res = await fetch(`${API_BASE}/students`);
    if (!res.ok) throw new Error('Failed to load students');
    const json = await res.json();
    return json.students;
}
