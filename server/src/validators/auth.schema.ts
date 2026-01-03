import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password required"),
});

export const registerSchema = z
  .object({
    firstName: z.string("Invalid first name"),
    lastName: z.string("Invalid last name"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().optional(),
    password: z.string().min(6, "Password at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
