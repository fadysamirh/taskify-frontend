import { FC } from "react";
import { SxProps } from "@mui/system";
import { Control, Controller } from "react-hook-form";
import { Box, InputLabel, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  label?: string;
  style?: SxProps;
  placeholder?: string | null;
  control: Control;
  required?: boolean;
  autoFocus?: boolean;
  size?: "small" | "medium";
  type?: React.InputHTMLAttributes<unknown>["type"];
  disabled?: boolean;
  filled?: boolean;
  options: string[];
  defaultValue?: string;
};

export const AppDropdown: FC<Props> = ({
  name,
  label,
  placeholder,
  control,
  required = false,
  autoFocus,
  size = "medium",
  type,
  style = {},
  disabled,
  filled = true,
  options = [],
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
        defaultValue={defaultValue ?? ""}
        render={({ field }) => (
          <TextField
            {...field}
            select={true}
            sx={{ ...style }}
            type={type}
            autoFocus={autoFocus}
            disabled={disabled}
            fullWidth
            size={size}
            variant={filled ? "filled" : "outlined"}
            placeholder={placeholder ?? undefined}
            defaultValue={defaultValue ?? ""}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
};
