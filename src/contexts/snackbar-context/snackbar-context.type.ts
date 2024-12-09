export type SnackbarContextType = {
  showSnackbar: (message: string, severity: string) => void;
};

export const SnackbarContextDefaultValue: SnackbarContextType = {
  showSnackbar: () => {},
};
