import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  changeEmailFormSchema,
  ChangeEmailFormSchema,
} from "../forms/emailForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";

export const useEmailForm = (email: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ChangeEmailFormSchema>({
    defaultValues: { newEmail: email },
    resolver: zodResolver(changeEmailFormSchema),
  });

  const onSubmit = form.handleSubmit(async (data: ChangeEmailFormSchema) => {
    setIsLoading(true);
    const { error } = await authClient.changeEmail({
      newEmail: data.newEmail,
    });
    if (error) {
      toast.error("Gagal mengubah email", { description: error.message });
    } else {
      toast.success("Email berhasil diubah.");
      form.reset(data);
    }
    setIsLoading(false);
  });

  return { form, isLoading, onSubmit };
};
