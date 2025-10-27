import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Card, CardContent, Link, Stack, CircularProgress } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/"); // redirect if needed
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
      }}
    >
      <Card sx={{ width: 400, p: 4, borderRadius: 4, backgroundColor: "#fff" }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", letterSpacing: 1, mb: 4 }}>
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
              <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />

              {error && <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>}

              <Button type="submit" fullWidth sx={{ mt: 1, py: 1.2, fontSize: "1rem", fontWeight: "bold", borderRadius: "10px", backgroundColor: "#1976d2", color: "#fff", "&:hover": { backgroundColor: "#1565c0" } }} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>

<Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
  <Link
    underline="hover"
    sx={{
      fontSize: 16,
      color: "text.secondary",
      fontFamily: "'Poppins', sans-serif"
    }}
    onClick={() => navigate("/forgot")}
  >
    Forget password?
  </Link>

  <Link
    underline="hover"
    sx={{
      fontSize: 14,
      color: "#1976d2",
      fontWeight: "bold",
      cursor: "pointer",
      fontFamily: "'Poppins', sans-serif", 
    }}
    onClick={() => navigate("/register")}
  >
    Register
  </Link>
</Box>

            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
