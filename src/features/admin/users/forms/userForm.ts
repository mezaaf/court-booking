import { emailSchema, passwordSchema } from "@/features/auth/forms/authSchema";
import z from "zod";

export const createUserFormSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: emailSchema,
  password: passwordSchema,
  role: z.boolean("Role wajib diisi"),
});

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;
