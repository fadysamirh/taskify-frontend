import React, { createContext, useContext, useMemo, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AppContextType } from "@/contexts/app-context/app-context.type";
import {
  SnackbarContextDefaultValue,
  SnackbarContextType,
} from "@/contexts/snackbar-context/snackbar-context.type";

const SnackbarContext = createContext(SnackbarContextDefaultValue);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: string) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  const data: SnackbarContextType = { showSnackbar };

  return (
    <SnackbarContext.Provider value={data}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleClose}
          sx={{ width: "100%" }}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
