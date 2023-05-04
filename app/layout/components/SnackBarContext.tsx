import { Close } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  AlertTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import * as React from "react";

export type AlertSnackBarPropType = {
  message: string;
  severity?: AlertColor;
  sx?: React.CSSProperties;
};

export const SnackBarContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  showAlert: (alert: AlertSnackBarPropType) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showDemoAlert: () => {},
});

function AlertSnackBar({
  message,
  severity,
  sx,
}: AlertSnackBarPropType): JSX.Element {
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Close fontSize="small" />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={severity} sx={sx}>
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    </Snackbar>
  );
}

export function SnackBarProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [alerts, setAlerts] = React.useState<AlertSnackBarPropType[]>([]);
  const showAlert = React.useCallback((alert: AlertSnackBarPropType) => {
    setAlerts((x) => [...x, alert]);
  }, []);
  const showDemoAlert = React.useCallback(() => {
    showAlert({
      message: "This is a demo. We are launching in Q3 2023.",
      severity: "info",
    });
  }, [showAlert]);
  const value = React.useMemo(
    () => ({ showAlert, showDemoAlert }),
    [showAlert, showDemoAlert],
  );

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {alerts.map((alert) => (
        <AlertSnackBar key={alert.message} {...alert} />
      ))}
    </SnackBarContext.Provider>
  );
}

export const useSnackBar = () => React.useContext(SnackBarContext);
