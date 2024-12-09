"use client";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { LoginFormComponent } from "@/components/login-form/login-form.component";
import Image from "next/image";
import { useIsMobile } from "@/contexts/app-context/app-context.hooks";
import { RegisterFormComponent } from "@/components/register-form/register-form.component";

type Props = {};

export const RegisterPageContainer: FC<Props> = ({}) => {
  const isMobile = useIsMobile();
  const styles = {
    image: {
      width: "50vw",
      height: "100vh",
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
  };

  return !isMobile ? (
    <Box sx={styles.container}>
      <RegisterFormComponent />
      <Image
        src={"/authentication-hero.jpeg"}
        alt={"Authentication Hero"}
        width={800}
        height={800}
        style={styles.image}
      />
    </Box>
  ) : (
    <RegisterFormComponent />
  );
};
