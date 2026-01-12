import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme }) => ({
  // TODO: There has to be an alternative solution

  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: -1,
  width: "100%",
  height: 700,
  pointerEvents: "none",
  background:
    "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(210, 100%, 90%), transparent)",
  [theme.breakpoints.up("sm")]: {
    height: 700,
  },
  ...theme.applyStyles("dark", {
    background:
      "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(210, 100%, 16%), transparent)",
  }),
}));

export default function FeaturesHero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Our
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              &nbsp;Features
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Read about Flux Shop's Implemented Features
          </Typography>
        </Stack>
        <StyledBox />
      </Container>
    </Box>
  );
}
