import React, { useState } from "react";
import { Box, TextField, Button, Card, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Registration successful!");
        navigate("/");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #1976d2, #42a5f5)" }}>
      <Card sx={{ width: 450, p: 5, borderRadius: 4, backgroundColor: "#fff" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 3 }}>Register</Typography>

        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} margin="normal" />

        {error && <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>{error}</Typography>}

        <Button fullWidth variant="contained" sx={{ mt: 3, py: 1.3, fontSize: "1rem", fontWeight: "bold", backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#115293" } }} onClick={handleRegister} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2, color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/")}>
          Already have an account? Login
        </Typography>
      </Card>
    </Box>
  );
}
