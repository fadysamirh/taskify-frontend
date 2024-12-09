import { object, string, mixed, date } from "yup";
import { TaskPriorityEnum } from "@/enums/task-priority.enum";
import { TaskStatusEnum } from "@/enums/task.status.enum";

export const updateTaskSchema = object({
  title: string().required("Title is required").max(255),
  description: string().required("Description is required").max(624),
  priority: mixed<TaskPriorityEnum>()
    .oneOf(Object.values(TaskPriorityEnum))
    .required("Priority is required"),
  status: mixed<TaskStatusEnum>()
    .oneOf(Object.values(TaskStatusEnum))
    .required("Priority is required"),
  dueDate: date().required("Due Date is required"),
}).required();
