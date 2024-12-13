"use client";
import { useForm } from "react-hook-form";
import { FC, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AppTextField } from "@/components/common/app-text-field/app-text-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material/styles";
import { registerFormSchema } from "@/components/register-form/register-form.schema";
import Image from "next/image";
import { useIsMobile } from "@/contexts/app-context/app-context.hooks";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/app-context/app-context";

export const RegisterFormComponent: FC = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const router = useRouter();
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
    resolver: yupResolver(registerFormSchema),
  });

  const styles = {
    container: {
      width: isMobile ? "100%" : "35%",
      height: "100vh",
      display: "flex",
      justifyContent: isMobile ? "start" : "center",
      flexDirection: "column",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: isMobile ? "4vw" : "0",
      paddingRight: isMobile ? "4vw" : "0",
    },
    button: {
      marginTop: isMobile ? "6vw" : "2vw",
    },
    loginNow: {
      color: theme.palette.primary.main,
      fontSize: theme.typography.body2.fontSize,
    },
    loginNowContainer: {
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
      right: "50vw",
      top: "1vw",
    },
    centerButton: { width: "100%", display: "flex", justifyContent: "center" },
  };

  const onRegister = async () => {
    setLoading(true);
    await appContext.register({
      email: getValues("email"),
      password: getValues("password"),
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
    });
    setLoading(false);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={isMobile ? styles.logoMobile : styles.logo}>
        <Image src={"/logo.png"} alt={"Logo"} width={200} height={200} />
      </Box>
      <Typography variant={"h3"} fontWeight={"bold"}>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onRegister)}>
        <Box>
          <AppTextField
            name={"firstName"}
            control={control}
            label={"First Name"}
            required={true}
            error={errors.firstName}
          />
          <AppTextField
            name={"lastName"}
            control={control}
            label={"Last Name"}
            required={true}
            error={errors.lastName}
          />
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
            Register
          </Button>
        </Box>
      </form>
      <Box sx={styles.loginNowContainer}>
        <Typography variant={"body2"}>Already a user? </Typography>
        <Button
          variant={"inlineText"}
          sx={styles.loginNow}
          onClick={() => router.replace("login")}
        >
          Login Now
        </Button>
      </Box>
    </Box>
  );
};
