"use client";
import React, { useState } from "react";
import AppTheme from "@/app/shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "@/app/components/AppAppBar";
import Hero from "@/app/components/Hero";
import LogoCollection from "@/app/components/LogoCollection";
import Footer from "@/app/components/Footer";
import { Box, Divider, Grow } from "@mui/material";
import { useEffect } from "react";
import FeaturedItems from "@/app/components/FeaturedItems";

export default function HomePage(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Grow in={isLoaded} timeout={1000}>
        <Box>
          <AppAppBar />
          <Hero flag="home" />
        </Box>
      </Grow>
      <div>
        <FeaturedItems />
        <Divider />

        <Footer />
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
      </div>
    </AppTheme>
  );
}
