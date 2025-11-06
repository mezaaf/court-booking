import { authClient } from "@/server/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginFormSchema, LoginFormSchema } from "../forms/authSchema";

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = form.handleSubmit(async (data: LoginFormSchema) => {
    setIsLoading(true);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  });

  return { form, onSubmit, isLoading };
};
