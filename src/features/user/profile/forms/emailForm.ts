import { emailSchema } from "@/features/auth/forms/authSchema";
import z from "zod";

export const changeEmailFormSchema = z.object({
  newEmail: emailSchema,
});

export type ChangeEmailFormSchema = z.infer<typeof changeEmailFormSchema>;
