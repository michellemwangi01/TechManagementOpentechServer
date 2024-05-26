const express = require("express");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

const tasksRouter = express.Router();

tasksRouter.post("/", createTask);
tasksRouter.get("/", getTasks);
tasksRouter.delete("/:id", deleteTask);

module.exports = tasksRouter;
