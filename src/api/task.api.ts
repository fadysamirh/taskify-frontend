import { CreateTaskDto } from "@/dtos/task/create-task.dto";
import { BaseResponseDto } from "@/dtos/base-response.dto";
import { TaskDto } from "@/dtos/task/task.dto";
import { privateApi } from "@/api/instances/api.instance";
import { AxiosResponse } from "axios";
import { UpdateTaskDto } from "@/dtos/task/update-task.dto";

export class TaskApi {
  public static async createTask(
    createTaskDto: CreateTaskDto,
  ): Promise<AxiosResponse<BaseResponseDto<TaskDto>>> {
    return await privateApi().post("/task-management", createTaskDto);
  }

  public static async getTasks(
    status?: string,
  ): Promise<AxiosResponse<BaseResponseDto<TaskDto[]>>> {
    return await privateApi().get("/task-management", { params: { status } });
  }

  public static async updateTask(
    updateTaskDto: UpdateTaskDto,
    taskId: string,
  ): Promise<AxiosResponse<BaseResponseDto<TaskDto>>> {
    return await privateApi().patch(
      `/task-management/${taskId}`,
      updateTaskDto,
    );
  }

  public static async deleteTask(
    taskId: string,
  ): Promise<AxiosResponse<BaseResponseDto<void>>> {
    return await privateApi().delete(`/task-management/${taskId}`);
  }
}
