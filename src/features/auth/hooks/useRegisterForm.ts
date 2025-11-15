import { authClient } from "@/server/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerFormSchema, RegisterFormSchema } from "../forms/authSchema";
import { useState } from "react";

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = form.handleSubmit(async (data: RegisterFormSchema) => {
    setIsLoading(true);
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: "/images/user.jpg",
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Berhasil mendaftar! Silakan periksa email Anda untuk verifikasi."
      );
      form.reset();
    }
    setIsLoading(false);
  });

  return { form, onSubmit, isLoading };
};
