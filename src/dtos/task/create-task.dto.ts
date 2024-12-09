import { TaskPriorityEnum } from "@/enums/task-priority.enum";
import { TaskStatusEnum } from "@/enums/task.status.enum";

export interface CreateTaskDto {
  title: string;
  description: string;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  dueDate: Date;
}
