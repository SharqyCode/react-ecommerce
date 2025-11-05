import React, { useEffect,useRef } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { addOrder } from "../../api/ordersApi";
import { useAuth } from "../../context/AuthContext";

export default function PaySuccess() {
  const navigate = useNavigate();
  const { products, resetCart } = useCart();
  const { user } = useAuth();
  const hasCreatedOrder = useRef(false);
  const productsSnapshot = useRef(products);

  useEffect(() => {
    // ✅ Run only when user & products are ready
    if (!user || products.length === 0 || hasCreatedOrder.current) return;

    (async () => {
      try {
        hasCreatedOrder.current = true; // prevent double fire
        console.log("🟢 Creating order for user:", user._id);

        const cartItems = products.map((product) => ({
          product: product._id,
          quantity: product.quantity,
        }));

        await addOrder({ user: user._id, items: cartItems });
        resetCart();
      } catch (error) {
        console.error("Order creation failed:", error);
      }
    })();
  }, [user, products]);

  // {
  //     "user": "68ffaaf8adbdc29938c6f1f9",
  //         "items": [
  //             {
  //                 "product": "690315dbc6fa90e75278c5ee",
  //                 "quantity": 5
  //             }
  //         ]
  // }

  if (!user) return <Typography>Loading...</Typography>;
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
