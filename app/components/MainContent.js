import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import { filterProducts, getProducts } from "../services/productService";
import Product from "./Product";
import React, { useEffect, useState } from "react";

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = useState("all");
  const [items, setItems] = useState([]);

  const handleClick = async (filter) => {
    const filteredItems = await filterProducts(filter);
    setItems(filteredItems);
    setFocusedCardIndex(filter);
  };

  useEffect(() => {
    async function retrieveItems() {
      const allItems = await getProducts();
      setItems(allItems);
    }
    retrieveItems();
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Featured Items
        </Typography>
        <Typography>Browse through our latest products</Typography>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip
            onClick={() => {
              handleClick("all");
            }}
            size="medium"
            label="All categories"
            sx={{
              backgroundColor: focusedCardIndex === "all" ? "" : "transparent",
              border: focusedCardIndex === "all" ? "none" : "",
            }}
          />
          <Chip
            onClick={() => {
              handleClick("men's clothing");
            }}
            size="medium"
            label="Men's Clothing"
            sx={{
              backgroundColor:
                focusedCardIndex === "men's clothing" ? "" : "transparent",
              border: focusedCardIndex === "men's clothing" ? "none" : "",
            }}
          />
          <Chip
            onClick={() => {
              handleClick("women's clothing");
            }}
            size="medium"
            label="Women's Clothing"
            sx={{
              backgroundColor:
                focusedCardIndex === "women's clothing" ? "" : "transparent",
              border: focusedCardIndex === "women's clothing" ? "none" : "",
            }}
          />
          <Chip
            onClick={() => {
              handleClick("electronics");
            }}
            size="medium"
            label="Electronics"
            sx={{
              backgroundColor:
                focusedCardIndex === "electronics" ? "" : "transparent",
              border: focusedCardIndex === "electronics" ? "none" : "",
            }}
          />
          <Chip
            onClick={() => {
              handleClick("jewelery");
            }}
            size="medium"
            label="Jewelry"
            sx={{
              backgroundColor:
                focusedCardIndex === "jewelery" ? "" : "transparent",
              border: focusedCardIndex === "jewelery" ? "none" : "",
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
        </Box>
      </Box>
      <Grid container spacing={3}>
        {items &&
          items.map((item, index) => (
            <Grid
              key={item.title}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              margin-bottom="auto"
            >
              <Product src={item.image} title={item.title} price={item.price} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
