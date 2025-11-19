import {
  changeEmailFormSchema,
  ChangeEmailFormSchema,
} from "@/features/user/profile/forms/emailForm";
import { authClient } from "@/server/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateEmailForm = (email: string, userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ChangeEmailFormSchema>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: { newEmail: email ?? "" },
  });
  const onSubmit = form.handleSubmit(async (data: ChangeEmailFormSchema) => {
    setIsLoading(true);
    const { error } = await authClient.admin.updateUser({
      userId,
      data: {
        email: data.newEmail,
      },
    });
    if (error) {
      toast.error("Gagal", { description: error.message });
    } else {
      toast.success("Berhasil mengubah email user");
      form.reset(data);
    }
    setIsLoading(false);
  });

  return { form, onSubmit, isLoading };
};
