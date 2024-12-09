"use client";
import "./globals.css";
import createEmotionCache from "@/create-emotion-cache";
import { CacheProvider } from "@emotion/react";
import React from "react";
import { Theme } from "@/styles/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AppContextProvider } from "@/contexts/app-context/app-context";
import { AppNotifications } from "@/components/common/app-notifications/app-notifications";

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appTheme = Theme();

  return (
    <html lang="en">
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <body>
            <AppNotifications />
            <AppContextProvider>{children}</AppContextProvider>
          </body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
