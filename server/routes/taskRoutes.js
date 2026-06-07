const express = require("express");

const {
  getTasks,
  createTask,
  updateTask,
  reorderTasks,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/reorder", reorderTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;