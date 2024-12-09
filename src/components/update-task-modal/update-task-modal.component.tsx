"use client";
import React, { FC, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTaskSchema } from "@/components/create-task-modal/create-task-modal.schema";
import { TaskPriorityEnum } from "@/enums/task-priority.enum";
import { TaskStatusEnum } from "@/enums/task.status.enum";
import { AppTextField } from "@/components/common/app-text-field/app-text-field";
import { AppDropdown } from "@/components/common/app-dropdown/app-dropdown";
import { AppDatePicker } from "@/components/common/app-date-picker/app-date-picker";
import { useIsMobile } from "@/contexts/app-context/app-context.hooks";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import { TaskApi } from "@/api/task.api";
import { useSnackbar } from "@/contexts/snackbar-context/snackbar-context";
import { Notify } from "@/components/common/app-notifications/notifications";
import { TaskDto } from "@/dtos/task/task.dto";
import { updateTaskSchema } from "@/components/update-task-modal/update-task-modal.schema";
import { UpdateTaskDto } from "@/dtos/task/update-task.dto";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: TaskDto;
  update: () => void;
};

const UpdateTaskModalComponent: FC<Props> = ({
  open = true,
  setOpen,
  task,
  update,
}) => {
  const handleClose = () => setOpen(false);
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
    },
    resolver: yupResolver(updateTaskSchema),
  });

  const styles = {
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: isMobile ? "100%" : "50%",
      height: isMobile ? "100%" : "auto",
      bgcolor: "background.paper",
      border: 0,
      outline: 0,
      borderRadius: "20px",
      p: 4,
      "@media (max-width: 768px)": {
        width: "100%",
        height: "100%",
        borderRadius: 0,
      },
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "2%",
    },
    button: {
      marginTop: "5%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await TaskApi.updateTask(
        {
          title: getValues("title"),
          description: getValues("description"),
          priority: getValues("priority"),
          status: getValues("status"),
          dueDate: getValues("dueDate"),
        },
        task._id,
      );
      update();
      Notify.success(response.data.message);
      handleClose();
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={styles.container}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.neutral._500,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id={"modal-modal-title"} variant={"h3"} fontWeight={"bold"}>
          Update Task
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppTextField
            name={"title"}
            control={control}
            label={"Title"}
            error={errors.title}
            defaultValue={task.title}
            maxLength={624}
          />
          <AppTextField
            name={"description"}
            control={control}
            label={"Description"}
            multiline={true}
            error={errors.description}
            defaultValue={task.description}
            maxLength={624}
          />
          <Box sx={styles.row}>
            <AppDropdown
              placeholder={"Select Priority"}
              label={"Priority"}
              name={"priority"}
              control={control}
              options={Object.values(TaskPriorityEnum)}
              defaultValue={task.priority}
            />
            <AppDropdown
              label={"Status"}
              name={"status"}
              control={control}
              options={Object.values(TaskStatusEnum)}
              defaultValue={task.status}
            />
          </Box>
          <AppDatePicker
            name={"dueDate"}
            control={control}
            label={"Due Date"}
            error={errors.dueDate}
            defaultValue={task.dueDate}
          />
          <Box sx={styles.button}>
            <Button type={"submit"} variant={"contained"} size={"large"}>
              {loading ? <CircularProgress size={"small"} /> : "Update Task"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default UpdateTaskModalComponent;
