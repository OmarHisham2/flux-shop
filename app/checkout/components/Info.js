import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {
  getCartItemsFromLocalStorage,
  getCartTotal,
} from "@/app/services/cartService";
import { Box, Button, IconButton } from "@mui/material";
import { Delete, ProductionQuantityLimits } from "@mui/icons-material";
import { useCart } from "@/app/context/CartContext";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { red } from "@/app/shared-theme/themePrimitives";
function Info() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  function handleClick(type, product) {
    if (type === "INCREMENT") {
      addToCart(product);
    } else if (type === "DECREMENT") {
      removeFromCart(product);
    }
  }
  const router = useRouter();

  function handleReturnHome() {
    router.push("/home");
  }

  if (cartItems.length <= 0) {
    return (
      <>
        <Box sx={{ mb: 10 }}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Total
          </Typography>
          <Typography variant="h4" gutterBottom>
            $0
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ProductionQuantityLimits
            sx={{
              fontSize: 120,
              opacity: 0.2,
              mb: 2,
            }}
          />
          <Typography>Your Cart is Empty!</Typography>
        </Box>
      </>
    );
  }

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        ${getCartTotal(cartItems)}
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={
                <span>
                  <img src={product.src} width="25%" />
                </span>
              }
              secondary={
                <Box
                  component={"span"}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography component={"span"}>{product.title} </Typography>
                  <Box
                    component={"span"}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography>${product.price}</Typography>
                    <Typography component={"span"}>
                      &emsp;x{product.quantity}
                    </Typography>
                  </Box>
                </Box>
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
                width: "80px",
                flexShrink: 0,
              }}
            >
              <IconButton
                onClick={() => {
                  handleClick("INCREMENT", product);
                }}
              >
                +
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                ${product.price * product.quantity}
              </Typography>
              <IconButton
                onClick={() => {
                  handleClick("DECREMENT", product);
                }}
              >
                {product.quantity <= 1 ? <Delete /> : "-"}
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default Info;
