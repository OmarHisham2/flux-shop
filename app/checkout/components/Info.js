import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { getCartTotal } from "@/app/services/cartServices";
import { Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCart } from "@/app/context/CartContext";
import React from "react";
function Info() {
  const { cartItems, addToCart, removeFromCart, orderPlaced } = useCart();

  function handleClick(type, product) {
    if (type === "INCREMENT") {
      addToCart(product);
    } else if (type === "DECREMENT") {
      removeFromCart(product);
    }
  }

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        {orderPlaced ? "Summary" : "Total"}
      </Typography>
      <Typography variant="h4" gutterBottom>
        ${getCartTotal(cartItems, 0).toFixed(2) ?? 0}
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
                    <Typography component={"span"}>
                      ${product.price.toFixed(2)}
                    </Typography>
                    {!orderPlaced && (
                      <Typography component={"span"}>
                        &emsp;x{product.quantity}
                      </Typography>
                    )}
                  </Box>
                </Box>
              }
            />
            {orderPlaced ? (
              <Typography component={"span"}>x{product.quantity}</Typography>
            ) : (
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
                  ${(product.price * product.quantity).toFixed(2)}
                </Typography>
                <IconButton
                  onClick={() => {
                    handleClick("DECREMENT", product);
                  }}
                >
                  {product.quantity <= 1 ? <Delete /> : "-"}
                </IconButton>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default Info;
