import { useAuthContext } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import Image from "next/image";
/*TODO: Change CardMedia to next/image*/
function Product({ src, title, price }) {
  const { addToCart } = useCart();


  const handleAddToCart = () => {
    addToCart({ src: src, title: title, price: price });
  };
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box position="relative" height="200px" width="100%" textAlign="center">
        <img src={src} style={{ height: "100%", objectFit: "cover" }} />
      </Box>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontSize: "1.1rem", fontWeight: 600, textWrap: "overflow" }}
        >
          {title}
        </Typography>
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button variant="outlined" size="small" fullWidth>
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;
