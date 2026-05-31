# Counselor Student Action Center

A full-stack demo app with a React + TypeScript + Vite frontend and a Node + Express + TypeScript backend.

## Project structure

- `client/` — React UI built with Vite, TypeScript, and Tailwind CSS.
- `server/` — Express API using an MVC-style layout with controllers, routes, services, models, and mock data.

## Setup

### 1. Install dependencies

From the repository root, install both client and server dependencies:

```bash
cd /Users/apple/Desktop/Assesent\ 1/client
npm install

cd ../server
npm install
```

### 2. Run the backend

```bash
cd /Users/apple/Desktop/Assesent\ 1/server
npm run dev
```

The API server runs by default on `http://localhost:4000`.

### 3. Run the frontend

```bash
cd /Users/apple/Desktop/Assesent\ 1/client
npm run dev
```

Open the Vite app in your browser at the URL shown in the terminal.

### 4. Build for production

```bash
cd /Users/apple/Desktop/Assesent\ 1/client
npm run build
```

## API contract

Base URL: `http://localhost:4000`

### GET /students

Returns a simple list of students.

Response example:

```json
{
  "students": [
    { "id": "s1", "name": "Jane Doe", "email": "jane@example.com" },
    { "id": "s2", "name": "John Smith", "email": "john@example.com" }
  ]
}
```

### GET /students/:id/action-center

Returns the selected student's profile, tasks, messages, unread count, and urgency counts.

Response example:

```json
{
  "student": {
    "id": "s1",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "grade": "11",
    "gpa": 3.8,
    "enrollmentStatus": "active"
  },
  "tasks": [
    /* task objects */
  ],
  "messages": [
    /* message objects */
  ],
  "unreadCount": 2,
  "urgencyCounts": { "urgent": 1, "high": 2 }
}
```

### PATCH /tasks/:taskId/status

Updates a task status.

Request body:

```json
{ "status": "todo" | "in_progress" | "completed" }
```

Response example:

```json
{
  "task": {
    "id": "task-1",
    "studentId": "s1",
    "status": "completed",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
}
```

## Architecture note

The project is structured as a clear front-end/back-end split:

- `client/` contains the interactive UI, data fetching, and presentation layer.
  - React components are organized under `src/components`.
  - The main page is `src/pages/ActionCenterPage.tsx`.
  - API calls are centralized in `src/services/api.ts`.

- `server/` contains a minimal Express API with an MVC-style layout.
  - `src/models/types.ts` defines the data shapes for students, tasks, messages, and payload responses.
  - `src/services/actionCenterService.ts` contains business logic for reading student action-center data and updating task status.
  - `src/controllers/` contains HTTP controller actions for student and task routes.
  - `src/routes/` defines named route modules and mounts them in `src/index.ts`.
  - `src/mockData.ts` provides in-memory mock payloads used by the service layer.

This separation makes it easy to iterate on frontend behavior independently from backend shape, while keeping the API contract stable for the UI.
