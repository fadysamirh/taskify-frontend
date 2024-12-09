import { FC } from "react";
import { SxProps } from "@mui/system";
import { Control, Controller, FieldError } from "react-hook-form";
import { Box, FormHelperText, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  label?: string;
  style?: SxProps;
  placeholder?: string | null;
  control: Control;
  error?: FieldError;
  required?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  multiline?: boolean;
  size?: "small" | "medium";
  type?: React.InputHTMLAttributes<unknown>["type"];
  disabled?: boolean;
  filled?: boolean;
  defaultValue?: string;
};

export const AppTextField: FC<Props> = ({
  name,
  label,
  placeholder,
  control,
  error,
  required = false,
  maxLength = 50,
  autoFocus,
  multiline = false,
  size = "medium",
  type,
  style = {},
  disabled,
  filled = true,
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
        render={({ field: { onChange } }) => (
          <TextField
            multiline={multiline}
            sx={{ ...style }}
            type={type}
            autoFocus={autoFocus}
            inputProps={{ maxLength: maxLength }}
            disabled={disabled}
            fullWidth
            error={Boolean(error)}
            size={size}
            onChange={onChange}
            variant={filled ? "filled" : "outlined"}
            rows={multiline ? 4 : 1}
            onFocus={(e) => {
              if (type === "number") {
                e.target.addEventListener("wheel", function (ev) {
                  ev.preventDefault();
                });
              }
            }}
            placeholder={placeholder ?? undefined}
            defaultValue={defaultValue ?? ""}
          />
        )}
      />
      <FormHelperText error>
        {Boolean(error) ? error?.message : undefined}
      </FormHelperText>
    </Box>
  );
};
