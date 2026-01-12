import Container from "@mui/material/Container";
import MainContent from "@/app/components/MainContent";

export default function FeaturedItems(props) {
  return (
    <Container
      maxWidth="lg"
      component="main"
      id="featureditems"
      sx={{ display: "flex", flexDirection: "column", mt: 2 }}
    >
      <MainContent />
    </Container>
  );
}
