import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPassword from "./components/ForgotPassword";
import { ThemeProvider } from "./context/ThemeContext";
import { Box } from "@mui/material";
import ThemeToggleButton from "./components/ThemeToggleButton";

function AppContent() {
  return (
    <Box  
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        transition: "0.3s",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <ThemeToggleButton />
      </Box>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}
