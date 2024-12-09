"use client";
import React, { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TaskApi } from "@/api/task.api";
import { Notify } from "@/components/common/app-notifications/notifications";
import { TaskDto } from "@/dtos/task/task.dto";
import { UpdateTaskDto } from "@/dtos/task/update-task.dto";
import FilterByStatusComponent from "@/components/filter-by-status/filter-by-status.component";
import CreateTaskModalComponent from "@/components/create-task-modal/create-task-modal.component";
import Image from "next/image";
const TaskCardComponent = React.lazy(
  () => import("@/components/task-card/task-card.component"),
);
type Props = {
  openCreateModal: boolean;
  setOpenCreateModal: (value: boolean) => void;
  tasks: TaskDto[];
  setTasks: (value: TaskDto[]) => void;
  update: () => void;
  onStatusChange: (status: string) => void;
  currentStatus: string;
  setCurrentStatus: (value: string) => void;
};

const TasksPageContainer: FC<Props> = ({
  openCreateModal,
  setOpenCreateModal,
  tasks,
  setTasks,
  update,
  onStatusChange,
  currentStatus,
  setCurrentStatus,
}) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      width: "70%",
      p: 2,
      gap: "1.5vw",
      "@media (max-width: 768px)": {
        p: 0,
        pt: 1,
        width: "100%",
        gap: "4vw",
      },
    },
    tasksContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1vw",
      "@media (max-width: 768px)": {
        gap: "3vw",
      },
    },
    noTaskContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1vw",
      marginTop: "5vw",
    },
  };

  const handleDelete = async (taskId: string) => {
    try {
      const response = await TaskApi.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      Notify.success(response.data.message);
    } catch (e: any) {
      if (e.response) {
        Notify.error(
          (e.response.data ? e.response.data.message : e.response.message) ??
            "Something went wrong",
        );
      } else {
        Notify.error(e.message ?? "Something went wrong");
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <FilterByStatusComponent
        onStatusChange={onStatusChange}
        currentStatus={currentStatus}
      />
      <Box sx={styles.tasksContainer}>
        {tasks.map((task) => (
          <TaskCardComponent
            task={task}
            key={task._id}
            deleteAction={handleDelete}
            update={update}
          />
        ))}
        {tasks.length === 0 && (
          <Box sx={styles.noTaskContainer}>
            <Image
              src={"/no-task.png"}
              alt={"No task"}
              width={200}
              height={300}
            />
            <Typography variant="h6" align="center">
              No tasks now! Create one to get started!
            </Typography>
          </Box>
        )}
      </Box>
      <CreateTaskModalComponent
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        update={update}
      />
    </Box>
  );
};
export default TasksPageContainer;
