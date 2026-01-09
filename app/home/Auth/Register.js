"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../shared-theme/AppTheme";
import { useFormStatus } from "react-dom";
import Alert from "@mui/material/Alert";
import { registerUser } from "../../services/authServices";
import { SitemarkIcon } from "../../components/CustomIcons";
import { Card, SignUpContainer } from "./authFormUtilities";

export default function Register({ props, toggleFn, switchFn }) {
  /*Local Form Validation States*/
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const [addressError, setAddressError] = useState(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState("");

  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  const { pending } = useFormStatus();

  /* Non-local Validation States */
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputsLocally = (
    name,
    email,
    password,
    confirmPassword,
    address,
    phoneNumber
  ) => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!confirmPassword || confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Please make sure your passwords match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!address || address.length < 1) {
      setAddressError(true);
      setAddressErrorMessage("Address is required.");
    }
    if (
      !phoneNumber ||
      phoneNumber.length < 6 ||
      /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
    )
      return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmpassword");
    const address = formData.get("address");
    const phoneNumber = formData.get("phoneNumber");

    const isValid = validateInputsLocally(
      name,
      email,
      password,
      confirmPassword,
      address,
      phoneNumber
    );

    if (isValid) {
      // Local Data Validated
      const response = await registerUser(
        name,
        email,
        password,
        address,
        phoneNumber
      );
      if (response) {
        setErrorMessage(response.message);
      } else {
        toggleFn(null);
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Emad S."
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="confirmpassword">
                  Confirm Password
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  placeholder="••••••"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  variant="outlined"
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMessage}
                  color={confirmPasswordError ? "error" : "primary"}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="address">Address</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="address"
                  placeholder="Random St."
                  type="text"
                  id="address"
                  variant="outlined"
                  error={addressError}
                  helperText={addressErrorMessage}
                  color={addressError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  placeholder="+20..."
                  inputMode="tel"
                  type="tel"
                  id="phoneNumber"
                  variant="outlined"
                  error={phoneError}
                  helperText={phoneErrorMessage}
                  color={phoneError ? "error" : "primary"}
                />
              </FormControl>
            </Box>
            {errorMessage && (
              <Alert color="error" severity="error">
                {errorMessage}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={pending}
            >
              {pending ? "Registering..." : "Register"}
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Button
                variant="body2"
                onClick={() => {
                  switchFn("login");
                }}
              >
                Login
              </Button>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
