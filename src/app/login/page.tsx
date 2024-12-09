"use client";
import { FC } from "react";
import { Box } from "@mui/material";
import { LoginPageContainer } from "@/containers/login-page/login-page.container";

const AuthenticationPage: FC = () => {
  return (
    <Box>
      <LoginPageContainer />
    </Box>
  );
};
export default AuthenticationPage;
