import React, { useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function PaySuccess() {
  const navigate = useNavigate();
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          maxWidth: 480,
          textAlign: "center",
          borderRadius: 4,
          bgcolor: "background.paper",
        }}
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Payment Successful!
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Thank you for your purchase. Your payment has been processed
          successfully. You’ll receive an email confirmation shortly.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
          sx={{ borderRadius: 3, px: 4 }}
        >
          Continue Shopping
        </Button>
      </Paper>
    </Box>
  );
}
