"use client";
import React from "react";
import { Box } from "@mui/material";
import HomePageContainer from "@/containers/home-page/home-page.container";
import { ButtonAppBar } from "@/components/button-app-bar/button-app-bar.component";

export default function Home() {
  return (
    <Box>
      <ButtonAppBar />
      <HomePageContainer />
    </Box>
  );
}
