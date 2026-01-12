import React from "react";

import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import { useColorScheme } from "@mui/material/styles";
import { Logout, Person, Person2, ShoppingBasket } from "@mui/icons-material";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { signOut } from "@firebase/auth";
import { auth } from "../services/firebase";
import { useCart } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import Link from "next/link";

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
        &nbsp;&nbsp;
        <Typography
          sx={{
            whiteSpace: "nowrap",
            maxWidth: "60px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.displayName}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
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
        <MenuItem component={Link} href="/myorders">
          <ListItemIcon>
            <ShoppingBasket fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Orders</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
