import { registerUser } from "@/app/services/authServices";
import { ChevronRightRounded } from "@mui/icons-material";
import { Alert, Box, Button, TextField } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function CheckoutForm() {
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

  /* Non-local Validation States */
  const [errorMessage, setErrorMessage] = useState("");
  const validateInputsLocally = (
    name,
    email,
    password,
    confirmPassword,
    address,
    phoneNumber,
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
      setNameErrorMessage("Please enter a valid name");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!address || address.trim().length < 1) {
      setAddressError(true);
      setAddressErrorMessage("Please enter a valid address.");
      isValid = false;
    }
    if (
      !phoneNumber ||
      phoneNumber.length < 6 ||
      !/^\+([0-9]{1,4})[-\s]?([0-9]{1,15})$/.test(phoneNumber)
    ) {
      setPhoneError(true);
      setPhoneErrorMessage(
        "Please enter a valid phone number (e.g., +20123...)",
      );
      isValid = false;
    }
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
      phoneNumber,
    );

    if (isValid) {
      // Local Data Validated
      const response = await registerUser(
        name,
        email,
        password,
        address,
        phoneNumber,
      );
      if (response) {
        setErrorMessage(response.message);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="first-name" required>
            Full name
          </FormLabel>
          <TextField
            name="name"
            required
            id="name"
            placeholder="Emad S."
            error={nameError}
            helperText={nameErrorMessage}
            color={nameError ? "error" : "primary"}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="last-name" required>
            Email
          </FormLabel>
          <TextField
            required
            id="email"
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            variant="outlined"
            error={emailError}
            helperText={emailErrorMessage}
            color={passwordError ? "error" : "primary"}
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="city" required>
            Password
          </FormLabel>
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
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="state" required>
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
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="address1" required>
            Address
          </FormLabel>
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
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="zip" required>
            Phone Number
          </FormLabel>
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
        </FormGrid>
        {errorMessage && (
          <Alert color="error" severity="error">
            {errorMessage}
          </Alert>
        )}
      </Grid>
      <Button
        variant="contained"
        type="submit"
        endIcon={<ChevronRightRounded />}
        sx={{
          width: { xs: "100%", sm: "fit-content" },
          display: "flex",
          alignSelf: "end",
        }}
      >
        Next
      </Button>
    </Box>
  );
}
