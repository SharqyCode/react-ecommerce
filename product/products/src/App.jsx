import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Rating,
  Grid,
} from "@mui/material";

export default function ProductPage() {
  const [tab, setTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = ["S", "M", "L", "XL"];

  const handleChange = (event, newTab) => {
    if (newTab !== null) setTab(newTab);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#fafafa" }}>
      {/* ====== PRODUCT CARD ====== */}
         <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        maxWidth: 1000,
        mx: "auto",
        mt: 1 ,
        p: 2,
      }}
    >
      {/* ===== IMAGE ===== */}
      <CardMedia
        component="img"
        image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
        alt="Cam Product"
        sx={{
          width: { xs: "100%", md: 400 },
height: { xs: 250, md: 400 },
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      {/* ===== DETAILS ===== */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="overline" color="text.secondary">
          Tech Devices 
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          Modern Cam
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "text.secondary" }}
            >
              $275
            </Typography>
            <Typography color="primary" fontWeight="bold">
              $150
            </Typography>
          </Box>

        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris
          vitae erat consequat auctor eu in elit.
        </Typography>

        {/* ===== SIZE BUTTONS ===== */}
        <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "contained" : "outlined"}
              onClick={() => setSelectedSize(size)}
              sx={{
                minWidth: 45,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                bgcolor:
                  selectedSize === size ? "primary.main" : "transparent",
                color:
                  selectedSize === size ? "white" : "text.primary",
                borderColor:
                  selectedSize === size ? "primary.main" : "grey.400",
                ":hover": {
                  bgcolor:
                    selectedSize === size
                      ? "primary.dark"
                      : "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              {size}
            </Button>
          ))}
        </Box>

        {/* ===== ADD TO CART ===== */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <TextField
            type="number"
            defaultValue={1}
            size="small"
            sx={{ width: 70 }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#1976d2", ":hover": { bgcolor: "#1565c0" } }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
      {/* ====== TOGGLE BUTTONS ====== */}
      <Box sx={{ maxWidth: 1000, mx: "auto",mt:3, textAlign: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={tab}
          exclusive
          onChange={handleChange}
          sx={{
            mb: 3,
            borderBottom: "1px solid #ddd",
            "& .MuiToggleButton-root": {
              border: "none",
              borderRadius: 0,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              color: "text.secondary",
            },
            "& .Mui-selected": {
              color: "black",
              borderBottom: "2px solid #1976d2",
            },
          }}
        >
          <ToggleButton value="description">Description</ToggleButton>
          <ToggleButton value="reviews">Reviews</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* ====== CONTENT SWITCH ====== */}
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          backgroundColor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        {tab === "description" ? (
          <>
            <Typography variant="h6" gutterBottom>
              Product Description
            </Typography>
           <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
              Since its creation lorem ipsum dolor sit amet, consectetur adipiscing elit...
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <img
                          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
        alt="Cam Product"
                  style={{
                    width: "100%",
                    borderRadius: 8,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Ut enim ad minim
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold" mt={2}>
                  Quis nostrud
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sed do eiusmod tempor incididunt ut labore.
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Review “Anchor Bracelet”
            </Typography>
<Typography
  variant="body2"
  color="text.secondary"
  component="p"
  sx={{ mb: 2 }}
>
              Your email address will not be published. Required fields are marked *
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Your rating:
              </Typography>
              <Rating />
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Your review *"
              sx={{ mb: 2 }}
            />
<Grid container spacing={2}>
  <Grid item xs={12} md={4}>
    <TextField fullWidth label="Name *" />
  </Grid>
<Grid item xs={12} md={8}>
    <TextField fullWidth label="Your email *" />
  </Grid>
</Grid>

            <Button
              variant="contained"
              sx={{ mt: 3, bgcolor: "#1976d2", ":hover": { bgcolor: "#1565c0" } }}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
