"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../services/firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../shared-theme/AppTheme";

import { useFormStatus } from "react-dom";
import Alert from "@mui/material/Alert";
import SitemarkIcon from "../../components/SitemarkIcon";
import { Card, SignUpContainer } from "./authFormUtilities";

export default function Login({ props, toggleFn, switchFn }) {
  /*Local Form Validation States*/
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const { pending } = useFormStatus();

  /* Non-local Validation States */
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputsLocally = (email, password) => {
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
      setPasswordErrorMessage("Please enter your password.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const isValid = validateInputsLocally(email, password);

    if (isValid) {
      // Validate Backend
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredentials.user) {
          console.log("User logged in " + userCredentials.user.displayName);
          toggleFn(null);
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-disabled":
            setErrorMessage(
              "This account has been disabled by an administrator."
            );
            break;
          case "auth/weak-password":
            setErrorMessage("Please write a better password.");
          case "auth/user-not-found":
            setErrorMessage("No account exists with this email.");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect password. Please try again.");
            break;
          case "auth/too-many-requests":
            // Very important for security!
            setErrorMessage(
              "Too many failed attempts. Please reset your password or try again later."
            );
            break;
          default:
            setErrorMessage(error.message);
        }
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
              {pending ? "Logging In..." : "Login"}
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Button
                variant="body2"
                sx={{ alignSelf: "center", fontWeight: "bold" }}
                onClick={() => {
                  switchFn("register");
                }}
              >
                Register Now!
              </Button>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
