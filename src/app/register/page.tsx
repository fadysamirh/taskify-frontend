"use client";
import { FC } from "react";
import { Box } from "@mui/material";
import { RegisterPageContainer } from "@/containers/register-page/register-page.container";

const AuthenticationPage: FC = () => {
  return (
    <Box>
      <RegisterPageContainer />
    </Box>
  );
};
export default AuthenticationPage;
