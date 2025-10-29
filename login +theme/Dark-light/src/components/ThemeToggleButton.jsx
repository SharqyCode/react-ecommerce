import React from "react";
import { Button } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Button
      onClick={toggleTheme}
      variant="contained"
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: 3,
        px: 2,
      }}
    >
      {mode === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </Button>
  );
}
    