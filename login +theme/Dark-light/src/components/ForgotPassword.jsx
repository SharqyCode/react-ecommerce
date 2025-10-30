import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();
  const { mode } = useThemeContext();

  const handleReset = () => {
    if (!email) {
      setError("Please enter your email.");
      setMessage("");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setMessage("");
      return;
    }

    setError("");
    setMessage("Reset link has been sent to your email!");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.3s",

      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            width: "100%",
            boxShadow: 4,
            borderRadius: 4,
            backgroundColor:
              mode === "light" ? "#fff" : theme.palette.background.paper,
            color: theme.palette.text.primary,
            transition: "0.3s",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: mode === "light" ? "#1976d2" : "#90caf9",
              }}
            >
              Forgot Password
            </Typography>

            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setMessage("");
              }}
              error={!!error}
              helperText={error}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />

            {message && (
              <Typography
                align="center"
                sx={{
                  mt: 2,
                  color: mode === "light" ? "green" : "#81c784",
                  fontWeight: "bold",
                }}
              >
                {message}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "10px",
                backgroundColor:
                  mode === "light"
                    ? "#1976d2"
                    : theme.palette.primary.main,
                "&:hover": {
                  backgroundColor:
                    mode === "light" ? "#1565c0" : "#2196f3",
                },
              }}
              onClick={handleReset}
              startIcon={<LockResetIcon />}
            >
              Reset Password
            </Button>

            <Typography
              align="center"
              sx={{
                mt: 3,
                color: mode === "light" ? "#1976d2" : "#90caf9",
                cursor: "pointer",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
              }}
              onClick={() => navigate("/")}
            >
              Back to Login
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
