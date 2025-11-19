import {
  profileFormSchema,
  ProfileFormSchema,
} from "@/features/user/profile/forms/profileForm";
import { User } from "@/generated/prisma/client";
import { authClient } from "@/server/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateProfileForm = (user: User) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name || "",
      image: user.image || null,
    },
  });
  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    const { error } = await authClient.admin.updateUser({
      userId: user.id,
      data,
    });
    if (error) {
      toast.error("Gagal", { description: error.message });
    } else {
      toast.success("Berhasil memperbarui pengguna");
      form.reset(data);
    }
    setIsLoading(false);
  });
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue("image", base64String, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const imagePreview = form.watch("image");

  const handleRemoveImage = () => {
    if (user.image) {
      form.setValue("image", user.image, { shouldDirty: true });
    } else {
      form.setValue("image", null, { shouldDirty: true });
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    imagePreview,
    handleChangeImage,
    handleRemoveImage,
  };
};
