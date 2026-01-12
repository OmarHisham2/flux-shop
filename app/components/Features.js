import { useState } from "react";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MuiChip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import responsiveDark from "@/assets/features/responsiveDark.png";
import responsiveLight from "@/assets/features/responsiveLight.png";
import { styled, useColorScheme, useTheme } from "@mui/material/styles";
import {
  Devices,
  Google,
  History,
  ShoppingBag,
  VpnKey,
} from "@mui/icons-material";
import Image from "next/image";
import smallFirebaseLogo from "@/assets/features/smallFirebaseLogo.svg";
import orderHistoryDark from "@/assets/features/orderHistoryDark.svg";
import orderHistoryLight from "@/assets/features/orderHistoryLight.svg";
import seamlessCheckoutDark from "@/assets/features/seamlessCheckoutDark.svg";
import seamlessCheckoutLight from "@/assets/features/seamlessCheckoutLight.svg";
import secureLogo from "@/assets/features/secureLogo.svg";
const items = [
  {
    icon: <Google color="primary" />,
    title: "Firebase Integration",
    description:
      "Powered by Google Firebase for secure data handling. Flux Shop uses Firestore for real-time cart preservation and order storage.",
    imageLight: smallFirebaseLogo,
    imageDark: smallFirebaseLogo,
  },
  {
    icon: <VpnKey color="primary" />,
    title: "Secure Authentication",
    description:
      "Robust user registration and login systems. Authenticated users enjoy preserved carts across different sessions and devices.",
    imageLight: secureLogo,
    imageDark: secureLogo,
  },
  {
    icon: <ShoppingBag color="primary" />,
    title: "Seamless Checkout",
    description:
      "Guest checkout enabled. Non-authenticated users can start shopping immediately and register during the final steps.",
    imageLight: seamlessCheckoutLight,
    imageDark: seamlessCheckoutDark,
  },
  {
    icon: <History color="primary" />,
    title: "Order History",
    description:
      "A dedicated 'My Orders' page allows users to track their past purchases, viewing total prices, dates, and itemized product lists.",
    imageLight: orderHistoryLight,
    imageDark: orderHistoryDark,
  },
  {
    icon: <Devices color="primary" />,
    title: "Responsive Design",
    description:
      "Flux Shop is fully optimized for desktop, tablet, and mobile. Enjoy a high-end shopping experience regardless of your screen size.",
    imageLight: responsiveLight,
    imageDark: responsiveDark,
  },
];

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => !!selected,
      style: {
        background:
          "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
        color: "hsl(0, 0%, 100%)",
        borderColor: (theme.vars || theme).palette.primary.light,
        "& .MuiChip-label": {
          color: "hsl(0, 0%, 100%)",
        },
        ...theme.applyStyles("dark", {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={(theme) => ({
            mb: 2,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 280,
            backgroundImage: "var(--items-imageLight)",
            ...theme.applyStyles("dark", {
              backgroundImage: "var(--items-imageDark)",
            }),
          })}
          style={
            items[selectedItemIndex]
              ? {
                  "--items-imageLight": items[selectedItemIndex].imageLight,
                  "--items-imageDark": items[selectedItemIndex].imageDark,
                }
              : {}
          }
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "medium" }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

MobileLayout.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  selectedFeature: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.element,
    imageDark: PropTypes.string.isRequired,
    imageLight: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
};

export { MobileLayout };

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { mode } = useColorScheme();

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features">
      <Box sx={{ width: { sm: "100%", md: "60%" } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Flux Shop's Features
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          Implemented features
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: "100%",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: (theme.vars || theme).palette.action
                        .hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: "action.selected",
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
                      gap: 1,
                      textAlign: "left",
                      textTransform: "none",
                      color: "text.secondary",
                    },
                    selectedItemIndex === index && {
                      color: "text.primary",
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { xs: "100%", md: "70%" },
          }}
        >
          <Box
            sx={(theme) => ({
              m: "auto",
              width: "100%",
              height: "100%",
              position: "relative",
            })}
          >
            <Image
              fill
              src={
                mode === "dark"
                  ? selectedFeature.imageDark
                  : selectedFeature.imageLight
              }
              alt={selectedFeature.title}
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
