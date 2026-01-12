"use client";
import { Box } from "@mui/material";

function RootLayout({ children }) {
  return (
    <>
      <Box>{children}</Box>
    </>
  );
}

export default RootLayout;
