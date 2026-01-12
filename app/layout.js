import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppTheme from "./shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";
import AppAppBar from "./components/AppAppBar";
import Footer from "./components/Footer";

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
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <AppTheme>
            <CssBaseline enableColorScheme />
            <AuthContextProvider>
              <CartProvider>
                <AppAppBar />
                {children}
                <Footer />
              </CartProvider>
            </AuthContextProvider>
          </AppTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
