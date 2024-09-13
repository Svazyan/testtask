import { Schema, model } from "mongoose";
import { TaskPriority, TaskStatus } from "../constants/task";
import { ITask } from "../interface/task";

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Number, required: true },
  priority: { type: String, default: TaskPriority.Medium },
  assignedMember: { type: String, default: "unassigned" },
  status: { type: String, default: TaskStatus.inProgres },
});

const Task = model<ITask>("Task", taskSchema);
export default Task;
