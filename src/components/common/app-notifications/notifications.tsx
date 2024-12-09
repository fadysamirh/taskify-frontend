import { Typography } from "@mui/material";
import { toast } from "react-toastify";

export class Notify {
  public static info(message: string): void {
    toast.info(message, {
      position: "top-right",
    });
  }

  public static error(message: string, title?: string): void {
    if (title) {
      toast.error(
        <>
          <Typography sx={{ color: "#ffffff" }} variant="body1SemiBold">
            {title}
          </Typography>
          <Typography sx={{ color: "#ffffff" }} variant="body2">
            {message}
          </Typography>
        </>,
        {
          position: "top-right",
          theme: "colored",
        },
      );
    } else {
      toast.error(message, {
        position: "top-right",
        theme: "colored",
      });
    }
  }

  public static warning(message: string): void {
    toast.warning(message, {
      position: "top-right",
    });
  }

  public static success(message: string): void {
    toast.success(message, {
      position: "top-right",
      theme: "colored",
      style: {
        backgroundColor: "#12B76A",
      },
    });
  }
}
