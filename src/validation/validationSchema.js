import * as Yup from "yup";

export const registerValidation = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .min(2, "First name must be at least 2 characters.")
    .max(30, "First name cannot exceed 30 characters."),
  lastName: Yup.string()
    .required("Last name is required.")
    .min(2, "Last name must be at least 2 characters.")
    .max(30, "Last name cannot exceed 30 characters."),
  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
}).required();

export const loginValidation = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email address."),

  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
}).required();
