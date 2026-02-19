import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password required"),
});

export const industryTypes = [
  "CA_FIRM",
  "ACCOUNTING_TAX",
  "LAW_FIRM",
  "CONSULTING_FIRM",
  "FINANCIAL_ADVISORY",
  "OTHER",
] as const;

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().optional(),
    businessName: z.string().min(1, "Business name is required"),
    businessType: z.enum(industryTypes),
    otherBusinessType: z.string().optional(),
    password: z.string().min(6, "Password at least 6 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  )
  .refine(
    (data) => data.businessType !== "OTHER" || !!data.otherBusinessType?.trim(),
    {
      message: "Please specify your business type",
      path: ["otherBusinessType"],
    },
  );
