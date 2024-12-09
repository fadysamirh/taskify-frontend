"use client";
import React from "react";
import { Box } from "@mui/material";
import HomePageHeroComponent from "@/components/home-page-hero/home-page-hero.component";
import ImageSectionComponent from "@/components/image-section/image-section.component";
export default function HomePageContainer() {
  const styles = {
    container: {
      p: 3,
    },
  };
  return (
    <Box sx={styles.container}>
      <HomePageHeroComponent />
      <ImageSectionComponent />
    </Box>
  );
}
