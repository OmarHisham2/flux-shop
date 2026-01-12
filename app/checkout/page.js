"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CheckoutForm from "./components/CheckoutForm";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { CircularProgress, IconButton } from "@mui/material";
import { useCart } from "../context/CartContext";
import SitemarkIcon from "../components/SitemarkIcon";
import { Close } from "@mui/icons-material";
import MasonryImageList from "./components/MasonryImageList";
import { getUserData } from "../services/authServices";
import { getCartTotal } from "../services/cartServices";
import { createOrder } from "../services/orderServices";
import { v4 as uuidv4 } from "uuid";
import FluxShopIcon from "../components/FluxShopIcon";

export default function Checkout({ props }) {
  const { user } = useAuthContext();
  const [activeStep, setActiveStep] = useState(0);

  const { cartItems, changeOrderPlacedStatus, toggleCart } = useCart();

  const [orderID, setOrderID] = useState("");

  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (activeStep + 1 === steps.length) {
      setLoading(true);
      await createOrder(
        cartItems,
        orderID,
        user.uid,
        getCartTotal(cartItems, 9.99)
      );
      changeOrderPlacedStatus(true);
    }
    setActiveStep((prev) => prev + 1);
    setLoading(false);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    {
      async function retrieveUserDetails() {
        const userData = await getUserData(user.uid);
        setUserData(userData);
        setOrderID(uuidv4());
      }
      if (user) retrieveUserDetails();
    }
  }, []);

  function getStepContent(stepIndex, stepsArray) {
    const currentStepLabel = stepsArray[stepIndex];
    switch (currentStepLabel) {
      case "Create an Account":
        return <CheckoutForm />;
      case "Payment details":
        return <PaymentForm />;
      case "Review your order":
        return <Review userData={userData} />;
      default:
        return null;
    }
  }

  if (user === undefined) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (cartItems.length <= 0) {
    return (
      <>
        <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
          <IconButton onClick={toggleCart}>
            <Close />
          </IconButton>
        </Box>

        <Grid
          container
          sx={{
            height: {
              xs: "100%",
              sm: "calc(100dvh - var(--template-frame-height, 0px))",
            },
            mt: {
              xs: 4,
              sm: 0,
            },
          }}
        >
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 16,
              px: 10,
              gap: 4,
            }}
          >
            <FluxShopIcon />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Info
                totalPrice={
                  activeStep >= 2
                    ? `$${getCartTotal(cartItems, 9.99)}`
                    : `$${getCartTotal(cartItems, 0)}`
                }
              />
            </Box>
          </Grid>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignContent: "center",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: {
                xs: "transparent",
                sm: "background.default",
              },
              pt: { xs: 0, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Typography variant="h2">
              Looks like you haven't added anything yet!
            </Typography>
            <Typography variant="subtitle1">
              Explore our latest featured items to find something you love!
            </Typography>
            <MasonryImageList />
            <Button
              variant="contained"
              onClick={() => {
                toggleCart();
              }}
            >
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
  const steps = [
    ...(!user ? ["Create an Account"] : []),
    "Payment details",
    "Review your order",
  ];

  return (
    <>
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <IconButton
          onClick={() => {
            toggleCart();
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <FluxShopIcon />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info
              totalPrice={
                activeStep >= 2
                  ? `$${getCartTotal(cartItems, 9.99)}`
                  : `$${getCartTotal(cartItems, 0)}`
              }
            />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: "100%", height: 40 }}
              >
                {steps.map((label, idx) => (
                  <Step
                    key={label}
                    sx={{ ":first-child": { pl: 0 }, ":last-child": { pr: 0 } }}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2
                    ? `$${getCartTotal(cartItems, 9.99).toFixed(2)}`
                    : `$${getCartTotal(cartItems, 0).toFixed(2)}`}
                </Typography>
              </div>
              <InfoMobile
                totalPrice={
                  activeStep >= 2
                    ? (getCartTotal(cartItems) + 9.99).toFixed(2)
                    : getCartTotal(cartItems).toFixed(2)
                }
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Your order ID is
                  <strong>&nbsp;{orderID}</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
                  href="/myorders"
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, steps)}
                <Box
                  sx={[
                    {
                      display: "flex",
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: "60px",
                    },
                    activeStep !== 0
                      ? { justifyContent: "space-between" }
                      : { justifyContent: "flex-end" },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                      Previous
                    </Button>
                  )}
                  {steps[activeStep] !== "Create an Account" && (
                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={handleNext}
                      disabled={loading}
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "fit-content",
                          "&.Mui-disabled": {
                            backgroundColor: "primary.main",
                            color: "rgba(255, 255, 255, 0.7)",
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      {activeStep === steps.length - 1
                        ? !loading && "Place order"
                        : !loading && "Next"}
                      {activeStep === steps.length - 1 &&
                        loading &&
                        "Placing Order..."}
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
