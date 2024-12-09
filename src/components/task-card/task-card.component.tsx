import { FC, useState } from "react";
import { TaskDto } from "@/dtos/task/task.dto";
import {
  Box,
  Card,
  Chip,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { TaskStatusEnum } from "@/enums/task.status.enum";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { useIsMobile } from "@/contexts/app-context/app-context.hooks";
import UpdateTaskModalComponent from "@/components/update-task-modal/update-task-modal.component";
import { TaskApi } from "@/api/task.api";
import { Notify } from "@/components/common/app-notifications/notifications";

type Props = {
  task: TaskDto;
  deleteAction: (taskId: string) => void;
  update: () => void;
};

export const TaskCardComponent: FC<Props> = ({
  task,
  deleteAction,
  update,
}) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useIsMobile();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const changeStatus = async (status: TaskStatusEnum) => {
    try {
      setLoading(true);
      const response = await TaskApi.updateTask(
        {
          status: status,
        },
        task._id,
      );
      update();
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
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    spaceBetweenRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dropdown: {
      "& .MuiInputBase-input": {
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: "8px",
        "@media (max-width: 768px)": {
          "& .MuiOutlinedInput-root": {
            padding: "12px",
          },
        },
      },
      "& .MuiFilledInput-root": {
        borderRadius: "8px",
        fontSize: "10px",
        overflow: "hidden",
        "@media (max-width: 768px)": {
          fontSize: "10px",
          borderRadius: "12px",
        },
      },
    },
    iconButtons: {
      display: "flex",
      flexDirection: "row",
    },
    editIcon: {
      color: theme.palette.primary.light,
      fontSize: "20px",
    },
    deleteIcon: {
      color: theme.palette.error.light,
      fontSize: "20px",
    },
  };

  return (
    <Box>
      <UpdateTaskModalComponent
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        task={task}
        update={update}
      />

      <Card sx={styles.card}>
        <Box sx={styles.spaceBetweenRow}>
          <Typography variant={"body1Bold"}>{task.title}</Typography>{" "}
          <Box sx={styles.iconButtons}>
            <IconButton
              aria-label="edit"
              onClick={() => setOpenUpdateModal(true)}
            >
              <EditIcon sx={styles.editIcon} />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => deleteAction(task._id)}
            >
              <DeleteIcon sx={styles.deleteIcon} />
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant={"body2"}
          sx={{ minHeight: isMobile ? "50vw" : "5vw" }}
        >
          {task.description}
        </Typography>
        <Box sx={styles.spaceBetweenRow}>
          <Typography variant={"body2SemiBold"}>
            {new Date(task.dueDate).toLocaleDateString("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            <Chip label={task.priority} sx={{ marginLeft: "1vw" }} />
          </Typography>
          <TextField
            select={true}
            size={"small"}
            variant={"filled"}
            defaultValue={task.status ?? ""}
            onChange={(event) => changeStatus(event.target.value)}
            sx={styles.dropdown}
          >
            {Object.values(TaskStatusEnum).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Card>
    </Box>
  );
};

export default TaskCardComponent;
