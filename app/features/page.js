"use client";
import FeaturesHero from "@/app/features/components/FeaturesHero";
import Features from "../components/Features";
import { Box, Typography } from "@mui/material";
import nextJSLogo from "@/assets/nextJSLogo.svg";
import firebaseLogo from "@/assets/firebaseLogo.svg";
import reactLogo from "@/assets/reactLogo.svg";
import muiLogo from "@/assets/muiLogo.svg";
import Image from "next/image";
function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <Features />
      <Box sx={{ display: "flex", flexDirection: "column", mt: 10, gap: 4 }}>
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            fontSize: "clamp(3rem, 10vw, 3.5rem)",
            alignContent: "center",
            alignSelf: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          Technology
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: "inherit",
              color: "primary.main",
              ...theme.applyStyles("dark", {
                color: "primary.light",
              }),
            })}
          >
            &nbsp;Stack
          </Typography>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Image
            src={nextJSLogo}
            alt="Next.js"
            height={60}
            style={{ width: "auto" }}
          />
          <Image
            src={reactLogo}
            alt="React"
            height={60}
            style={{ width: "auto" }}
          />
          <Image
            src={firebaseLogo}
            alt="Firebase"
            height={60}
            style={{ width: "auto" }}
          />
          <Image
            src={muiLogo}
            alt="Firebase"
            height={60}
            style={{ width: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
}

export default FeaturesPage;
