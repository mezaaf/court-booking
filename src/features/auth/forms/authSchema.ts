import z from "zod";

const nameSchema = z
  .string()
  .min(2, { message: "Nama harus terdiri dari minimal 2 karakter." })
  .max(50, { message: "Nama harus terdiri dari maksimal 50 karakter." });
const emailSchema = z.email({ message: "Alamat email tidak valid." });
const passwordSchema = z
  .string()
  .min(8, { message: "Password harus terdiri dari minimal 8 karakter." })
  .max(100, { message: "Password harus terdiri dari maksimal 100 karakter." });

export const registerFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
