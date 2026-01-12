import shopLogo from "@/assets/shopLogo.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

function FluxShopIcon() {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image src={shopLogo} alt="Flux Shop Logo" height={40} />
        <Typography color="primary" sx={{ fontWeight: "bold", mr: 3 }}>
          Flux Shop
        </Typography>
      </Box>
    </>
  );
}

export default FluxShopIcon;
