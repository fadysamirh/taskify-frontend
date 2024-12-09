import { TaskPriorityEnum } from "@/enums/task-priority.enum";
import { TaskStatusEnum } from "@/enums/task.status.enum";

export interface TaskDto {
  _id: string;
  title: string;
  description: string;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  dueDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
