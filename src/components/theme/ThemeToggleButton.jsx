import React from "react";
import { Button } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Button
      onClick={toggleTheme}
      variant={mode === "light" ? "contained" : "outlined"}
      sx={{
        textTransform: "none",

        borderRadius: 100,
      }}
    >
      {mode === "light" ? "☀️" : "🌙"}
    </Button>
  );
}
