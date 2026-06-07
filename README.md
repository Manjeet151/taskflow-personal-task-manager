# TaskFlow - Personal Task Manager

TaskFlow is a full-stack personal task manager built for the Studio Graphene Full Stack Developer assessment. I chose **Exercise 1: Personal Task Manager**.

The app allows a user to create, view, update, complete, filter, search, reorder, and delete personal tasks. It uses a React frontend, a Node.js/Express backend, and JSON file storage for simple persistence.

## Live Demo Links

Frontend: [TaskFlow Live App](https://taskflow-personal-task-manager.netlify.app)

Backend API: [TaskFlow API](https://taskflow-personal-task-manager-x9p8.onrender.com/api/tasks)

## Tech Stack

### Frontend

* React with Vite
* Functional components with React hooks
* Plain CSS for custom responsive styling
* Fetch API for frontend-backend communication

### Backend

* Node.js
* Express.js
* CORS
* UUID for unique task IDs

### Storage

* JSON file storage using `server/data/tasks.json`

JSON file storage was chosen to keep the project simple and aligned with the assignment requirements. For a production version, I would use SQLite, PostgreSQL, or MongoDB for more reliable persistence.

## Features

* Add a new task with a required title, optional description, and optional due date.
* View all tasks with newest tasks shown first by default.
* Mark a task as complete or incomplete.
* Edit a task's title, description, and due date.
* Delete a task with a confirmation prompt.
* Filter tasks by All, Active, and Completed.
* Search tasks by title.
* Show total, active, and completed task counts.
* Visually highlight overdue tasks when the due date is in the past and the task is not completed.
* Show empty state messages when there are no tasks.
* Handle loading and error states.
* Responsive layout for desktop and mobile screens.
* Reorder tasks using drag-and-drop.

## How to Run Locally

Make sure Node.js is installed on your system.

### 1. Clone the repository

```bash
git clone https://github.com/Manjeet151/taskflow-personal-task-manager.git
cd taskflow-personal-task-manager
```

### 2. Install and run the backend

```bash
cd server
npm install
npm run dev
```

The backend will run on:

```bash
http://localhost:5000
```

### 3. Install and run the frontend

Open a new terminal from the project root:

```bash
cd client
npm install
npm run dev
```

The frontend will run on:

```bash
http://localhost:5173
```

## API Documentation

Base URL for local development:

```bash
http://localhost:5000/api/tasks
```

Live API URL:

```bash
https://taskflow-personal-task-manager-x9p8.onrender.com/api/tasks
```

### Get all tasks

```http
GET /api/tasks
```

Response:

```json
[
  {
    "id": "task-id",
    "title": "Complete assignment",
    "description": "Build the task manager app",
    "dueDate": "2026-06-08",
    "completed": false,
    "order": 0,
    "createdAt": "2026-06-05T10:30:00.000Z",
    "updatedAt": "2026-06-05T10:30:00.000Z"
  }
]
```

### Create a task

```http
POST /api/tasks
```

Request body:

```json
{
  "title": "Complete assignment",
  "description": "Build the task manager app",
  "dueDate": "2026-06-08"
}
```

Response:

```json
{
  "id": "task-id",
  "title": "Complete assignment",
  "description": "Build the task manager app",
  "dueDate": "2026-06-08",
  "completed": false,
  "order": 0,
  "createdAt": "2026-06-05T10:30:00.000Z",
  "updatedAt": "2026-06-05T10:30:00.000Z"
}
```

Validation error response:

```json
{
  "message": "Task title is required"
}
```

### Update a task

```http
PATCH /api/tasks/:id
```

Request body:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2026-06-09",
  "completed": true
}
```

Response:

```json
{
  "id": "task-id",
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2026-06-09",
  "completed": true,
  "order": 0,
  "createdAt": "2026-06-05T10:30:00.000Z",
  "updatedAt": "2026-06-05T11:00:00.000Z"
}
```

### Reorder tasks

```http
PATCH /api/tasks/reorder
```

Request body:

```json
{
  "orderedIds": ["task-id-1", "task-id-2", "task-id-3"]
}
```

Response:

```json
[
  {
    "id": "task-id-1",
    "title": "Complete assignment",
    "description": "Build the task manager app",
    "dueDate": "2026-06-08",
    "completed": false,
    "order": 0,
    "createdAt": "2026-06-05T10:30:00.000Z",
    "updatedAt": "2026-06-05T11:00:00.000Z"
  }
]
```

### Delete a task

```http
DELETE /api/tasks/:id
```

Response:

```json
{
  "message": "Task deleted successfully"
}
```

## Project Structure

```bash
taskflow-personal-task-manager/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── tasksApi.js
│   │   ├── components/
│   │   │   ├── TaskFilters.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskStats.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   └── taskController.js
│   ├── data/
│   │   └── tasks.json
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── fileStorage.js
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## What Works

* Backend CRUD API is working.
* React frontend is connected to the backend API.
* Tasks are persisted in a JSON file during local development.
* Add, edit, delete, complete/incomplete toggle, filter, search, and drag-and-drop features work.
* Drag-and-drop task reordering works across task views.
* Active/completed task counts are displayed.
* Overdue tasks are visually highlighted.
* Empty, loading, and error states are handled.
* Frontend production build runs successfully using `npm run build`.
* The app is deployed with Netlify for the frontend and Render for the backend.

## Deployment Notes

The project is structured as a monorepo with separate `client` and `server` folders.

Deployment:

* Frontend: Netlify
* Backend: Render

The backend currently uses JSON file storage. This works well locally and keeps the project simple. On some free hosting environments, file-based data may reset after redeploys or server restarts. In a production version, I would replace JSON file storage with SQLite, PostgreSQL, or MongoDB.

Also, because the backend is hosted on Render's free tier, the first request after inactivity may take some extra time while the server wakes up.

## Next Steps

With more time, I would improve the project by adding:

* Backend tests for task API endpoints.
* Toast notifications for create, update, and delete actions.
* Better date validation.
* Keyboard-accessible drag-and-drop support.
* SQLite or database-backed persistence.
* User authentication for personal task ownership.

## AI Usage

I used AI tools to help plan the project structure, understand implementation steps, debug issues, and improve documentation wording. I reviewed and understood the code before submission.
