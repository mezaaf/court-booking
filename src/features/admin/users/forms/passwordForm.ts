import { passwordSchema } from "@/features/auth/forms/authSchema";
import z from "zod";

export const passwordFormSchema = z.object({
  newPassword: passwordSchema,
});

export type PasswordFormSchema = z.infer<typeof passwordFormSchema>;
