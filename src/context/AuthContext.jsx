import { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../api/usersApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const login = (userData, signup = false) => {
    setUser(userData);
    // User is already registered
    if (!signup) showSnackbar("Welcome Back, Soldier!", "success");
    // User is a first-timer
    else showSnackbar("Welcome Aboard, Soldier!", "success");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    showSnackbar("Farewell, Soldier!", "info");
  };

  // Optional: verify token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserById(jwtDecode(token).id).then((data) => {
        setUser(data);
        console.log(`context setUser`, data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, showSnackbar }}>
      {children}
      {/* Global Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
