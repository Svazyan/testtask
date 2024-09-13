import { TaskPriority, TaskStatus } from "../constants/task";

export interface ITask {
  title: string;
  description: string;
  dueDate: number;
  priority: TaskPriority;
  assignedMember: string;
  status: TaskStatus;
}
