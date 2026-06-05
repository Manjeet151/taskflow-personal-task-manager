const { v4: uuidv4 } = require("uuid");
const { readTasks, writeTasks } = require("../utils/fileStorage");

// GET /api/tasks
const getTasks = (req, res) => {
  const tasks = readTasks();

  const sortedTasks = tasks.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  res.status(200).json(sortedTasks);
};

// POST /api/tasks
const createTask = (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Task title is required",
    });
  }

  const tasks = readTasks();

  const now = new Date().toISOString();

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    description: description ? description.trim() : "",
    dueDate: dueDate || "",
    completed: false,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
};

// PATCH /api/tasks/:id
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  const tasks = readTasks();

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      message: "Task title cannot be empty",
    });
  }

  const existingTask = tasks[taskIndex];

  const updatedTask = {
    ...existingTask,
    title: title !== undefined ? title.trim() : existingTask.title,
    description:
      description !== undefined ? description.trim() : existingTask.description,
    dueDate: dueDate !== undefined ? dueDate : existingTask.dueDate,
    completed:
      completed !== undefined ? Boolean(completed) : existingTask.completed,
    updatedAt: new Date().toISOString(),
  };

  tasks[taskIndex] = updatedTask;
  writeTasks(tasks);

  res.status(200).json(updatedTask);
};

// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
  const { id } = req.params;

  const tasks = readTasks();

  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const remainingTasks = tasks.filter((task) => task.id !== id);

  writeTasks(remainingTasks);

  res.status(200).json({
    message: "Task deleted successfully",
  });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};