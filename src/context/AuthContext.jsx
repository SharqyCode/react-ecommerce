import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
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

  const login = (userData) => {
    setUser(userData);
    showSnackbar("Welcome Back, Soldier!", "success");
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
      //   setLoading(false);
      //   return;
    }

    // axios
    //   .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
    //   .then((res) => setUser(res.data.user))
    //   .catch(() => logout())
    //   .finally(() => setLoading(false));
  }, []);

  //   if (loading) return <p>Loading...</p>;

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
