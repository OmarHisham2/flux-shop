import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Flux Shop",
  description: "Your one destination to stuff.",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthContextProvider>
              <CartProvider>{children}</CartProvider>
            </AuthContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
