"use client";

import { Box, CssBaseline, Grow } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import AppAppBar from "../components/AppAppBar";
function RootLayout({ props, children }) {
  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Box>{children}</Box>
      </AppTheme>
    </>
  );
}

export default RootLayout;
