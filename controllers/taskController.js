const Task = require("../models/taskModel");

// GET All
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// POST
exports.createTask = async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.status(201).json(task);
};

// PUT
exports.updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true });
  res.json(updated);
};

// DELETE
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Task deleted");
};
