// routes/task.routes.js

const express = require("express");
const router = express.Router();
const checkPermission = require("../middleware/checkPermission");
const protect = require("../middleware/protect");

// Dummy Task DB
let tasks = [{ id: 1, title: "Learn PBAC" }];

// Create Task
router.post("/tasks", protect, checkPermission("create:task"), (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Read All Tasks
router.get("/tasks", protect, checkPermission("read:task"), (req, res) => {
  res.json(tasks);
});

// Update Task
router.put("/tasks/:id", protect, checkPermission("update:task"), (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    task.title = req.body.title || task.title;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Delete Task
router.delete("/tasks/:id", protect, checkPermission("delete:task"), (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.json({ message: "Task deleted" });
});

module.exports = router;
