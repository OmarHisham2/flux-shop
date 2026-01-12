"use client";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import { fetchOrders } from "../services/orderServices";
import { LocalMall } from "@mui/icons-material";
import { useAuthContext } from "../context/AuthContext";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderID}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell component="th" scope="row">
          ${row.totalPrice.toFixed(2)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Image</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items?.map((product) => (
                    <TableRow key={product.title}>
                      <TableCell align="left" component="th">
                        <img
                          src={product.src}
                          style={{
                            width: "125px",
                            height: "125px",
                            objectFit: "contain",
                          }}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ width: "40%" }}>
                        {product.title}
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        ${(product.price * product.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function MyOrders() {
  const [userOrders, setUserOrders] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    async function getOrders() {
      if (!user?.uid) return;

      try {
        const orderData = await fetchOrders(user.uid);
        setUserOrders(orderData || []);
      } catch (error) {
        console.log("Failed to load user's orders: " + error);
      } finally {
        setLoading(false);
      }
    }
    getOrders();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ maxWidth: "lg", mx: "auto", mt: 15 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "left" }}
        >
          Loading Your Orders...
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", mt: 15 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 3, fontWeight: "bold", textAlign: "left" }}
      >
        My Orders
      </Typography>
      {userOrders.length <= 0 && (
        <Box sx={{ textAlign: "center" }}>
          <LocalMall sx={{ fontSize: 250, opacity: 0.2 }} />
          <Typography
            variant="subtitle1"
            component="h1"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            No Orders have been made yet!
          </Typography>
          <Button href="/home" variant="contained">
            Return Home
          </Button>
        </Box>
      )}

      {userOrders.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "background.paper" }}>
                <TableCell />
                <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Order Placed</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Total Price ( Incl. Shipping )
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userOrders.map((userOrder) => (
                <Row key={userOrder.orderID} row={userOrder} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
