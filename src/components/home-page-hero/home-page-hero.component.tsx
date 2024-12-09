"use client";
import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {};

export const HomePageHeroComponent: FC<Props> = ({}) => {
  const router = useRouter();
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "5vw",
      marginTop: "15vw",
    },
    typographyContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2vw",
      "@media (max-width: 768px)": {
        gap: "10vw",
      },
    },
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.typographyContainer}>
        <Typography variant={"h1"} textAlign={"center"}>
          Task Management Made Easy
        </Typography>
        <Typography textAlign={"center"}>
          Streamline your tasks, stay organized, and boost productivity with our
          intuitive task management platform.
        </Typography>
      </Box>
      <Button
        variant={"contained"}
        size={"large"}
        onClick={() => router.push("tasks")}
      >
        Get Started
      </Button>
    </Box>
  );
};
export default HomePageHeroComponent;
