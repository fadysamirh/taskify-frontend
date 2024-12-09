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
import { loginFormSchema } from "@/components/login-form/login-form.schema";
import { createTaskSchema } from "@/components/create-task-modal/create-task-modal.schema";
import { TaskPriorityEnum } from "@/enums/task-priority.enum";
import { TaskStatusEnum } from "@/enums/task.status.enum";
import { AppTextField } from "@/components/common/app-text-field/app-text-field";
import { AppDropdown } from "@/components/common/app-dropdown/app-dropdown";
import { AppDatePicker } from "@/components/common/app-date-picker/app-date-picker";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import { TaskApi } from "@/api/task.api";
import { useAppContext } from "@/contexts/app-context/app-context";
import { useSnackbar } from "@/contexts/snackbar-context/snackbar-context";
import { Notify } from "@/components/common/app-notifications/notifications";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  update: () => void;
};

const CreateTaskModalComponent: FC<Props> = ({
  open = true,
  setOpen,
  update,
}) => {
  const handleClose = () => {
    setOpen(false);
    clear();
  };
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: TaskPriorityEnum.LOW,
      status: TaskStatusEnum.PENDING,
      dueDate: undefined,
    },
    resolver: yupResolver(createTaskSchema),
  });

  const styles = {
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "auto",
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

  const clear = () => {
    setValue("title", "");
    setValue("description", "");
    setValue("priority", TaskPriorityEnum.LOW);
    setValue("status", TaskStatusEnum.PENDING);
    setValue("dueDate", undefined!);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await TaskApi.createTask({
        title: getValues("title"),
        description: getValues("description"),
        priority: getValues("priority"),
        status: getValues("status"),
        dueDate: getValues("dueDate"),
      });
      update();
      clear();
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
          Create Task
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppTextField
            name={"title"}
            control={control}
            label={"Title"}
            error={errors.title}
          />
          <AppTextField
            name={"description"}
            control={control}
            label={"Description"}
            multiline={true}
            error={errors.description}
          />
          <Box sx={styles.row}>
            <AppDropdown
              placeholder={"Select Priority"}
              label={"Priority"}
              name={"priority"}
              control={control}
              options={Object.values(TaskPriorityEnum)}
            />
            <AppDropdown
              label={"Status"}
              name={"status"}
              control={control}
              options={Object.values(TaskStatusEnum)}
            />
          </Box>
          <AppDatePicker
            name={"dueDate"}
            control={control}
            label={"Due Date"}
            error={errors.dueDate}
          />
          <Box sx={styles.button}>
            <Button type={"submit"} variant={"contained"} size={"large"}>
              {loading ? <CircularProgress size={"small"} /> : "Create Task"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default CreateTaskModalComponent;
