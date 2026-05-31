export interface Student {
    id: string;
    name: string;
    email: string;
    grade: number;
    gpa: number;
    counselorId: string;
    enrollmentStatus: string;
}

export interface Task {
    id: string;
    studentId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    id: string;
    studentId: string;
    from: string;
    subject: string;
    preview: string;
    read: boolean;
    receivedAt: string;
}

export interface ActionCenterPayload {
    student: Student;
    tasks: Task[];
    messages: Message[];
    unreadCount: number;
    urgencyCounts: Record<string, number>;
}
