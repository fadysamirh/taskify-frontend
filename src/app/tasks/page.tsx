"use client";
import { FC, useEffect, useState } from "react";
import TasksPageContainer from "@/containers/tasks-page/tasks-page.container";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ButtonAppBar } from "@/components/button-app-bar/button-app-bar.component";
import { useTheme } from "@mui/material/styles";
import { TaskApi } from "@/api/task.api";
import { Notify } from "@/components/common/app-notifications/notifications";
import { TaskDto } from "@/dtos/task/task.dto";

const TasksPage: FC = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("All");
  const [tasks, setTasks] = useState<TaskDto[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const styles = {
    container: {
      p: 3,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "70%",
      "@media (max-width: 768px)": {
        width: "100%",
      },
    },
    loadingContainer: {
      width: "100%",
      height: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loading: {
      color: theme.palette.primary.main,
    },
  };

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await TaskApi.getTasks();
      setTasks(response.data.data);
    } catch (e: any) {
      if (e.response) {
        Notify.error(
          (e.response.data ? e.response.data.message : e.response.message) ??
            "Something went wrong",
        );
      } else {
        Notify.error(e.message ?? "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  const update = async () => {
    await getTasks();
  };
  const onStatusChange = async (status: string) => {
    try {
      setLoading(true);
      const response = await TaskApi.getTasks(
        status === "All" ? undefined : status,
      );
      setCurrentStatus(status);
      setTasks(response.data.data);
    } catch (e: any) {
      if (e.response) {
        Notify.error(
          (e.response.data ? e.response.data.message : e.response.message) ??
            "Something went wrong",
        );
      } else {
        Notify.error(e.message ?? "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <Box>
      <ButtonAppBar />

      {loading ? (
        <Box sx={styles.loadingContainer}>
          <CircularProgress sx={styles.loading} size={100} />
        </Box>
      ) : (
        <Box sx={styles.container}>
          <Box sx={styles.row}>
            <Typography variant={"h2"} fontWeight={"semiBold"}>
              Your Tasks
            </Typography>
            <Button
              variant={"contained"}
              size={"medium"}
              onClick={() => setOpenCreateModal(true)}
            >
              Create Task
            </Button>
          </Box>
          <TasksPageContainer
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            openCreateModal={openCreateModal}
            setOpenCreateModal={setOpenCreateModal}
            setTasks={setTasks}
            tasks={tasks!}
            update={update}
            onStatusChange={onStatusChange}
          />
        </Box>
      )}
    </Box>
  );
};
export default TasksPage;
