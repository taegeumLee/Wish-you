import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(19, "You must be at least 19 years old to sign up"),
  height: z.number().min(140, "Please enter a valid height"),
  description: z.string().optional(),
});

export type SignUpForm = z.infer<typeof signUpSchema>;
export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
