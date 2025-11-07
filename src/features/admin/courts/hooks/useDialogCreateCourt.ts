import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createCourtFormSchema,
  CreateCourtFormSchema,
} from "../forms/courtForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const useDialogCreateCourt = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const form = useForm<CreateCourtFormSchema>({
    resolver: zodResolver(createCourtFormSchema),
    defaultValues: {
      name: "",
      description: "",
      pricePerHour: "",
      image: "",
      isActive: true,
    },
  });

  const onSubmit = form.handleSubmit(async (data: CreateCourtFormSchema) => {
    setIsLoading(true);
    const response = await fetch("/api/courts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response?.ok) {
      toast.error("Gagal menambahkan lapangan. Silakan coba lagi.");
    } else {
      toast.success("Berhasil menambahkan lapangan.");
      form.reset();
      setIsOpen(false);
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
    form.setValue("image", "", { shouldDirty: true });
  };

  return {
    form,
    onSubmit,
    isLoading,
    handleChangeImage,
    imagePreview,
    handleRemoveImage,
    isActive,
    setIsActive,
  };
};
