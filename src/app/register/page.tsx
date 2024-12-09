"use client";
import { FC } from "react";
import { Box } from "@mui/material";
import { LoginPageContainer } from "@/containers/login-page/login-page.container";
import { RegisterPageContainer } from "@/containers/register-page/register-page.container";

type Props = {};

const AuthenticationPage: FC<Props> = ({}) => {
  return (
    <Box>
      <RegisterPageContainer />
    </Box>
  );
};
export default AuthenticationPage;
