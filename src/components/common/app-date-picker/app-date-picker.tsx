import { FC } from "react";
import { borderRadius, SxProps } from "@mui/system";
import { Control, Controller, FieldError } from "react-hook-form";
import { Box, FormHelperText, InputLabel, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type Props = {
  name: string;
  label?: string;
  placeholder?: string | null;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
  defaultValue?: string;
};

export const AppDatePicker: FC<Props> = ({
  name,
  label,
  control,
  error,
  required = false,
  placeholder,
  defaultValue,
}) => {
  const styles = {
    inputBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
  };

  return (
    <Box sx={styles.inputBox} mt={1}>
      {label && <InputLabel required={required}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
        render={({ field: { onChange, value } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={onChange}
              defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
              slotProps={{ textField: { variant: "filled" } }}
              renderInput={(params: any) => (
                <TextField {...params} error={Boolean(error)} />
              )}
            />
          </LocalizationProvider>
        )}
      />
      <FormHelperText error>
        {Boolean(error) ? error?.message : undefined}
      </FormHelperText>
    </Box>
  );
};
