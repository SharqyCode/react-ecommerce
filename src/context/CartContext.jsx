import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
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

  const [products, setProducts] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          return parsedCart;
        }
      } catch (error) {
        console.error("Error parsing cart from Local Storage:", error);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    if (!products.includes(product)) {
      setProducts((prev) => [...prev, product]);
      showSnackbar("Added to Cart", "success");
    } else {
      showSnackbar("Already in cart", "error");
    }
  };
  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const resetCart = () => {
    setProducts([]);
  };

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        resetCart,
        total,
      }}
    >
      {children}
      {/* Global Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  );
};
