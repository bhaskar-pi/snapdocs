import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password required"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().optional(),
    password: z.string().min(6, "Password at least 6 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
