import { object, string } from "yup";

export const loginFormSchema = object({
  email: string()
    .required("Email is required")
    .max(320)
    .email("Email must be a valid email address"),
  password: string()
    .required("Password is required")
    .min(6, "Password should be of length 6 or more")
    .max(16, "Password should be of length 16 or less")
    .matches(
      /.*[A-Z].*/,
      "Password should contain at least one uppercase letter",
    ),
}).required();
