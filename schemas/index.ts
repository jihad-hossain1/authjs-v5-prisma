import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),

  password: z.string().min(6, {
    message: "minimum 6 characters required",
  }),

  name: z.string().min(5, {
    message: "minimum 5 charaacter required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),

  password: z.string().min(1, {
    message: "Password is required",
  }),

  code: z.optional(z.string()),
});
