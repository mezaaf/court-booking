import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordFormSchema, PasswordFormSchema } from "../forms/passwordForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";

export const useUpdatePasswordForm = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PasswordFormSchema>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      newPassword: "",
    },
  });
  const onSubmit = form.handleSubmit(async (data: PasswordFormSchema) => {
    setIsLoading(true);
    const { error } = await authClient.admin.setUserPassword({
      newPassword: data.newPassword,
      userId,
    });
    if (error) {
      toast.error("Gagal", { description: error.message });
    } else {
      toast.success("Kata sandi berhasil diubah");
      form.reset();
    }
    setIsLoading(false);
  });

  return {
    form,
    isLoading,
    onSubmit,
  };
};
