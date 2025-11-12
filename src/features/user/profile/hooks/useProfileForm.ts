import { User } from "@/server/auth/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { profileFormSchema, ProfileFormSchema } from "../forms/profileForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";

export const useProfileForm = (user: User) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileFormSchema>({
    defaultValues: {
      name: user.name || "",
      image: user.image || null,
    },
    resolver: zodResolver(profileFormSchema),
  });

  const onSubmit = form.handleSubmit(async (data: ProfileFormSchema) => {
    setIsLoading(true);
    const { error } = await authClient.updateUser(data);
    if (error) {
      toast.error("Failed to update user", { description: error.message });
    } else {
      toast.success("User updated successfully");
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
    isLoading,
    onSubmit,
    handleChangeImage,
    imagePreview,
    handleRemoveImage,
  };
};
