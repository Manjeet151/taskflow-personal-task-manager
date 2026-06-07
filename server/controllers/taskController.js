const { v4: uuidv4 } = require("uuid");
const { readTasks, writeTasks } = require("../utils/fileStorage");

const sortTasks = (tasks) => {
  return tasks.sort((a, b) => {
    const orderA = typeof a.order === "number" ? a.order : 0;
    const orderB = typeof b.order === "number" ? b.order : 0;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

const getTasks = (req, res) => {
  const tasks = readTasks();
  res.status(200).json(sortTasks(tasks));
};

const createTask = (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Task title is required" });
  }

  const tasks = readTasks();
  const now = new Date().toISOString();

  const existingOrders = tasks.map((task) =>
    typeof task.order === "number" ? task.order : 0
  );

  const newOrder =
    existingOrders.length > 0 ? Math.min(...existingOrders) - 1 : 0;

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    description: description ? description.trim() : "",
    dueDate: dueDate || "",
    completed: false,
    order: newOrder,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({ message: "Task title cannot be empty" });
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

const reorderTasks = (req, res) => {
  const { orderedIds } = req.body;

  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ message: "orderedIds must be an array" });
  }

  const tasks = readTasks();
  const taskIds = tasks.map((task) => task.id);

  const hasInvalidId = orderedIds.some((id) => !taskIds.includes(id));

  if (hasInvalidId) {
    return res.status(400).json({ message: "Invalid task id in reorder list" });
  }

  const updatedTasks = tasks.map((task) => {
    const newOrder = orderedIds.indexOf(task.id);

    return {
      ...task,
      order: newOrder === -1 ? task.order : newOrder,
      updatedAt: new Date().toISOString(),
    };
  });

  writeTasks(updatedTasks);

  res.status(200).json(sortTasks(updatedTasks));
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  const tasks = readTasks();
  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({ message: "Task not found" });
  }

  const remainingTasks = tasks.filter((task) => task.id !== id);

  writeTasks(remainingTasks);

  res.status(200).json({ message: "Task deleted successfully" });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  reorderTasks,
  deleteTask,
};