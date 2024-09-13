import { TaskStatus } from "./../constants/task";
import { Types } from "mongoose";
import Task from "../schema/task";
import { ITask } from "../interface/task";

class TaskCrateController {
  static async createTask(body: ITask) {
    const { title, description, dueDate, priority, assignedMember } = body;
    const createTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedMember,
    });
    return createTask.save();
  }

  static async updateTask(taskId: Types.ObjectId) {
    let message = "";
    const updateTask = await Task.findOne({ _id: taskId });

    if (!updateTask) {
      message = "task not found";
    } else if (updateTask && updateTask.status === TaskStatus.completed) {
      message = "you are allready finished this task";
    } else {
      updateTask.status = TaskStatus.completed;
      updateTask.save();
      return updateTask;
    }
    return message;
  }

  static async getTask(taskId: Types.ObjectId) {
    let message = "";
    const getTask = await Task.findOne({ _id: taskId });
    if (!getTask) {
      message = "task not found";
    } else {
      return getTask;
    }
    return message;
  }

  static async getCompletedTasks() {
    let message = "";
    const completedTasks = await Task.find({ status: TaskStatus.completed });
    const completedTasksCount = await Task.countDocuments({
      status: TaskStatus.completed,
    });
    if (completedTasksCount === 0) {
      message = "You do not have any completed task yet";
    } else {
      let totalTaskDuration = 0;
      for (const complitedTask of completedTasks) {
        if (complitedTask.dueDate) {
          totalTaskDuration += complitedTask.dueDate;
        }
      }
      const averageTasksDuration = totalTaskDuration / completedTasksCount;      
      return { averageTasksDuration, completedTasksCount };
    }
    return message;
  }
}

export default TaskCrateController;
