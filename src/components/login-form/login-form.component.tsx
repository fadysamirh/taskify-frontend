"use client";
import { useForm } from "react-hook-form";
import React, { FC, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { AppTextField } from "@/components/common/app-text-field/app-text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/contexts/app-context/app-context.hooks";
import Image from "next/image";
import { useAppContext } from "@/contexts/app-context/app-context";
import { loginFormSchema } from "@/components/login-form/login-form.schema";

export const LoginFormComponent: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useIsMobile();
  const appContext = useAppContext();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginFormSchema),
  });

  const styles = {
    container: {
      width: isMobile ? "100%" : "35%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: isMobile ? "start" : "center",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: isMobile ? "4vw" : "0",
      paddingRight: isMobile ? "4vw" : "0",
    },
    button: {
      marginTop: isMobile ? "6vw" : "2vw",
    },
    registerNow: {
      color: theme.palette.primary.main,
      fontSize: theme.typography.body2.fontSize,
    },
    registerNowContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: isMobile ? "4vw" : "1vw",
      gap: "5px",
    },
    logoMobile: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "8vw",
      marginBottom: "4vw",
    },
    logo: {
      position: "absolute",
      left: "50vw",
      top: "1vw",
    },
    centerButton: { width: "100%", display: "flex", justifyContent: "center" },
  };

  const onLogin = async () => {
    setLoading(true);
    await appContext.login({
      email: getValues("email"),
      password: getValues("password"),
    });
    setLoading(false);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={isMobile ? styles.logoMobile : styles.logo}>
        <Image src={"/logo.png"} alt={"Logo"} width={200} height={200} />
      </Box>
      <Typography variant={"h3"} fontWeight={"bold"}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onLogin)}>
        <Box>
          <AppTextField
            name={"email"}
            control={control}
            label={"Email"}
            required={true}
            error={errors.email}
          />
          <AppTextField
            name={"password"}
            control={control}
            label={"Password"}
            required={true}
            type={"password"}
            error={errors.password}
          />
        </Box>

        <Box sx={styles.centerButton}>
          <Button
            variant={"contained"}
            sx={styles.button}
            type={"submit"}
            size={"large"}
          >
            {loading ? <CircularProgress size={"small"} /> : "Login"}
          </Button>
        </Box>
      </form>
      <Box sx={styles.registerNowContainer}>
        <Typography variant={"body2"}>Don't have an account? </Typography>
        <Button
          variant={"inlineText"}
          sx={styles.registerNow}
          onClick={() => router.replace("register")}
        >
          Register Now
        </Button>
      </Box>
    </Box>
  );
};
