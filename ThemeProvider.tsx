"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

// Customize your MUI theme here
const theme = createTheme({
  palette: {
    primary: {
      main: "#2ba149", // Default blue
    },
    secondary: {
      main: "#dc004e", // Default pink
    },
    error: {
      main: "#f44336", // Default red
    },
    warning: {
      main: "#ff9800", // Default orange
    },
    info: {
      main: "#2196f3", // Default light blue
    },
    success: {
      main: "#4caf50", // Default green
    },
  },
});

// Theme wrapper
const MuiThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Optional: Normalize browser styles */}
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
