import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "../forms/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";

export const useLoginForm = () => {
  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = form.handleSubmit(async (data: LoginFormSchema) => {
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi.");
    }
  });

  return { form, onSubmit };
};
