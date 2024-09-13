import express from "express";
import TaskCrateController from "../controller/task";
import mongoose from "mongoose";
import { body, param } from "express-validator";

const taskRouter = express.Router();

taskRouter
  .route("/create/task")
  .post(async (req, res, next) => {
    try {
      const response = await TaskCrateController.createTask(req.body);
      res.send(response);
    } catch (e) {
      console.log("error", e);
      next(e);
    }
  })
  .put(
    body("id").custom((value) => mongoose.isValidObjectId(value)),
    async (req, res, next) => {
      try {
        const taskId = req.body.id;
        const response = await TaskCrateController.updateTask(
          new mongoose.Types.ObjectId(taskId)
        );
        res.send(response);
      } catch (e) {
        console.log("error", e);
        next(e);
      }
    }
  );

taskRouter.route("/:taskId").get(
  param("taskId").custom((value) => mongoose.isValidObjectId(value)),
  async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
      if (typeof taskId === "string") {
        const objectId = new mongoose.Types.ObjectId(taskId);
        const response = await TaskCrateController.getTask(objectId);
        res.send(response);
      } else {
        res.status(400).send({ error: "Invalid task ID format" });
      }
    } catch (e) {
      console.log("error", e);
      next(e);
    }
  }
);

taskRouter.route("/completed/tasks/count").get(async (req, res, next) => {
  try {
    const response = await TaskCrateController.getCompletedTasks();
    res.json(response);
  } catch (e) {
    console.log("error", e);
    next(e);
  }
});
export default taskRouter;
