import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { products, removeProduct, increaseQuantity, decreaseQuantity, total } =
    useCart();

  return (
    <Card
      sx={{
        maxWidth: 900,
        margin: "40px auto",
        boxShadow: 8,
        background: "#f4f4f7ff",
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Cart
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ background: "#ffffffff" }}>
              <TableCell>
                <Typography fontWeight="bold">Product Image</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" align="center">
                  Product Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" align="center">
                  Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" align="center">
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" align="center">
                  SubTotal
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" align="center">
                  Remove
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Your cart is empty
                </TableCell>
              </TableRow>
            ) : (
              products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar
                      src={item.img || "/placeholder.png"}
                      alt={item.name}
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        size="small"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography align="center" sx={{ mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        align="center"
                        size="small"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <AddIcon align="center" fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => removeProduct(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="h6">
            Total: <strong>${total.toFixed(2)}</strong>
          </Typography>
          <Button variant="contained" sx={{ background: "#b93030ff" }}>
            Checkout
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartPage;
