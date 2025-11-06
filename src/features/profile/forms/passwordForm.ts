import { passwordSchema } from "@/features/auth/forms/authSchema";
import z from "zod";

export const changePasswordFormSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Kata sandi saat ini wajib diisi" }),
  newPassword: passwordSchema,
});

export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;
