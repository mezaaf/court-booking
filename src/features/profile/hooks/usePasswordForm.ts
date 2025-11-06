import { useState } from "react";
import {
  changePasswordFormSchema,
  ChangePasswordFormSchema,
} from "../forms/passwordForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";

export const usePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: ChangePasswordFormSchema) => {
    setIsLoading(true);
    const { error } = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    });
    if (error) {
      toast.error("Gagal mengubah kata sandi", { description: error.message });
    } else {
      toast.success("Kata sandi berhasil diubah");
      form.reset();
    }
    setIsLoading(false);
  });

  return { form, isLoading, onSubmit };
};
