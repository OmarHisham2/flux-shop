"use client";
import { forwardRef, useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "@/app/shared-theme/ColorModeIconDropdown";
import {
  Badge,
  Dialog,
  DialogContent,
  Skeleton,
  Slide,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useAuthContext } from "@/app/context/AuthContext.js";
import ProfileDropdown from "@/app/shared-theme/ProfileDropdown";
import { useCart } from "@/app/context/CartContext";
import Register from "../home/Auth/Register";
import Login from "../home/Auth/Login";
import Checkout from "../checkout/page";
import Image from "next/image";
import FluxShopIcon from "./FluxShopIcon";
import { signOut } from "@firebase/auth";
import { auth } from "../services/firebase";
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppAppBar() {
  const [open, setOpen] = useState(false);

  const [authMode, setAuthMode] = useState(null);

  const switchAuth = (type) => {
    setAuthMode(type);
  };

  const { user, loading } = useAuthContext();

  const { cartCount, cartOpen, toggleCart, clearCart } = useCart();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearCart();
      console.log("Signed out successfuly!");
    } catch (e) {
      console.log("Couldn't sign out" + e);
    }
  };
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      elevation={0}
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <FluxShopIcon />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small" href="/home">
                Home
              </Button>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small" href="/features">
                Features
              </Button>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small">
                About
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {user && loading && (
              <Skeleton>
                <ProfileDropdown />
              </Skeleton>
            )}
            {user && !loading && <ProfileDropdown />}
            {!user && loading && (
              <Skeleton animation="wave">
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  underline="none"
                  onClick={() => setAuthMode("login")}
                >
                  Sign in
                </Button>
              </Skeleton>
            )}
            {!user && !loading && (
              <Button
                color="primary"
                variant="outlined"
                size="small"
                underline="none"
                onClick={() => setAuthMode("login")}
              >
                Sign in
              </Button>
            )}
            <IconButton
              aria-label="cart"
              data-screenshot="toggle-mode"
              disableRipple
              size="small"
              aria-controls={open ? "color-scheme-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => {
                toggleCart();
              }}
            >
              <ShoppingCart fontSize="small" />
              <Badge
                badgeContent={cartCount}
                color="primary"
                overlap="circular"
              />
            </IconButton>
            <ColorModeIconDropdown />
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            {user && loading && (
              <Skeleton>
                <ProfileDropdown />
              </Skeleton>
            )}
            {user && !loading && <ProfileDropdown />}
            <IconButton
              aria-label="cart"
              data-screenshot="toggle-mode"
              disableRipple
              size="small"
              aria-controls={open ? "color-scheme-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => {
                toggleCart();
              }}
            >
              <ShoppingCart fontSize="small" />
              <Badge
                badgeContent={cartCount}
                color="primary"
                overlap="circular"
              />
            </IconButton>
            <ColorModeIconDropdown />

            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawer(true)}
              size="small"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem href="/home">Home</MenuItem>
                <MenuItem href="/features">Features</MenuItem>
                <MenuItem href="/about">About</MenuItem>
                <Divider sx={{ my: 3 }} />
                {!user && (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={() => setAuthMode("register")}
                    >
                      Register
                    </Button>
                  </MenuItem>
                )}
                {!user && (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      fullWidth
                      onClick={() => setAuthMode("login")}
                    >
                      Login
                    </Button>
                  </MenuItem>
                )}
                {user && (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      fullWidth
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
      <Dialog
        open={authMode !== null}
        onClose={() => setAuthMode(null)}
        sx={{
          "& .MuiPaper-root": {},
          backgroundImage: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <DialogContent
          sx={{
            p: 0,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {(authMode === "login" && (
            <Login switchFn={switchAuth} toggleFn={switchAuth} />
          )) ||
            (authMode === "register" && (
              <Register switchFn={switchAuth} toggleFn={switchAuth} />
            ))}
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen
        open={cartOpen}
        slots={{
          transition: Transition,
        }}
      >
        <Checkout closeCartFn={toggleCart} />
      </Dialog>
    </AppBar>
  );
}
