"use client";

import { useEffect, useState } from "react";
import { getShuffledProducts } from "@/app/services/productServices";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Marquee from "react-fast-marquee";
import { CircularProgress } from "@mui/material";

const StyledImg = styled("img")({
  width: "120px",
  height: "120px",
  objectFit: "contain",
  borderRadius: "8px",
  padding: "4px",
  flexShrink: 0,
});

export default function HorizontalProductList() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    async function loadData() {
      const shuffledProducts = await getShuffledProducts();
      if (shuffledProducts) {
        setItems(shuffledProducts);
      }
    }
    loadData();
  }, []);
  if (items === null) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Marquee>
        {items.map((item) => (
          <Box key={item.title}>
            <StyledImg src={item.image} alt={item.title} />
          </Box>
        ))}
      </Marquee>
    </Box>
  );
}
