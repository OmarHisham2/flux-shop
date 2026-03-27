import { useCart } from "@/app/context/CartContext";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import Image from "next/image";
import { useState } from "react";
/*TODO: Change CardMedia to next/image*/
function Product({ src, title, price }) {
  const { addToCart, toggleCart } = useCart();

  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = () => {
    addToCart({ src: src, title: title, price: price });
  };

  const handleBuyNow = () => {
    addToCart({ src: src, title: title, price: price });
    toggleCart();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale3d(1.05, 1.05, 1)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          height: "200px",
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          style={{
            objectFit: "contain",
            transition: "opacity 0.4s ease-in-out",
            opacity: imageLoading ? 0 : 1,
          }}
          onLoad={() => setImageLoading(false)}
          unoptimized
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          ${price.toFixed(2)}
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
        <Button
          onClick={handleBuyNow}
          variant="outlined"
          size="small"
          fullWidth
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;
