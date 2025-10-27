import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    setMessage(" reset link has been sent to your email!");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            width: "100%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: "bold", mb: 3, color: "#1976d2" }}
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
            />

            {message && (
              <Typography
                align="center"
                sx={{
                  mt: 2,
                  color: "green",
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
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
              onClick={handleReset}
              startIcon={<LockResetIcon />}
            >
              Reset Password
            </Button>

            <Typography
              align="center"
              sx={{ mt: 3, color: "#1976d2", cursor: "pointer" }}
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
