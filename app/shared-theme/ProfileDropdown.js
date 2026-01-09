import React, { useState } from "react";

import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";
import {
  ArrowDownward,
  ArrowDownwardSharp,
  Logout,
  Person2,
  South,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { signOut } from "@firebase/auth";
import { auth } from "../services/firebase";
import { useCart } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";

export default function ProfileDropdown(props) {
  const { mode, systemMode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { clearCart } = useCart();
  const { user } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearCart();
      console.log("Signed out successfuly!");
    } catch (e) {
      console.log("Couldn't sign out");
    }
  };
  if (!mode) {
    return (
      <Box
        data-screenshot="toggle-mode"
        sx={(theme) => ({
          verticalAlign: "bottom",
          display: "inline-flex",
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: "1px solid",
          borderColor: (theme.vars || theme).palette.divider,
        })}
      />
    );
  }
  const resolvedMode = systemMode || mode;
  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
  }[resolvedMode];
  return (
    <React.Fragment>
      <Button
        data-screenshot="toggle-mode"
        disableRipple
        size="small"
        variant="outlined"
        onClick={handleClick}
        aria-controls={open ? "color-scheme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...props}
      >
        <Person2 sx={{ fontSize: 20 }} />
        &nbsp;&nbsp;{user.displayName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            variant: "outlined",
            elevation: 0,
            sx: {
              my: "4px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Button startIcon={<Person2 />}>Profile</Button>
        <Button onClick={handleLogout} startIcon={<Logout />}>
          Logout
        </Button>
      </Menu>
    </React.Fragment>
  );
}
