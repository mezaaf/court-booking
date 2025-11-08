import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createCourtFormSchema,
  CreateCourtFormSchema,
} from "../forms/courtForm";
import courtServices from "../services/court";

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
    const response = await courtServices.createCourt({
      ...data,
      isActive,
    });
    console.log(response);
    if (response.data.status === 201) {
      toast.success(response.data.message || "Lapangan berhasil ditambahkan");
      form.reset();
      setIsOpen(false);
    } else if (response.data.status === 401) {
      toast.error(response.data.message || "Unauthorized");
    } else if (response.data.status === 403) {
      toast.error(response.data.message || "Forbidden");
    } else {
      toast.error(
        response.data.message || "Terjadi kesalahan saat menambahkan lapangan"
      );
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
