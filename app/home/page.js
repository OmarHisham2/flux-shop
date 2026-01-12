"use client";
import { useState } from "react";
import Hero from "@/app/components/Hero";
import { Box, Grow } from "@mui/material";
import { useEffect } from "react";
import FeaturedItems from "@/app/components/FeaturedItems";
import Footer from "../components/Footer";

export default function HomePage(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <>
      <Grow in={isLoaded} timeout={1000}>
        <Box>
          <Hero flag="home" />
        </Box>
      </Grow>
      <FeaturedItems />
      {/*
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        */}
    </>
  );
}
