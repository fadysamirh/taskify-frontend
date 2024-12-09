import { FC, useState } from "react";
import { Box, InputLabel, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { TaskStatusEnum } from "@/enums/task.status.enum";
import { TaskDto } from "@/dtos/task/task.dto";
import { TaskApi } from "@/api/task.api";
import { Notify } from "@/components/common/app-notifications/notifications";

type Props = {
  onStatusChange: (status: string) => void;
  currentStatus: string;
};

export const FilterByStatusComponent: FC<Props> = ({
  onStatusChange,
  currentStatus,
}) => {
  return (
    <Box>
      <InputLabel>Filter By Status</InputLabel>
      <TextField
        select={true}
        size={"small"}
        variant={"filled"}
        defaultValue={currentStatus}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        {["All", ...Object.values(TaskStatusEnum)].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
export default FilterByStatusComponent;
