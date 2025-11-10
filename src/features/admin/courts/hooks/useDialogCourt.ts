import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import courtServices from "../services/court";
import { courtFormSchema, CourtFormSchema } from "../forms/courtForm";

export const useDialogCourt = ({
  mode,
  refetchCourts,
  courtId,
  initialValues,
}: {
  mode: "create" | "update";
  refetchCourts: () => void;
  courtId?: string;
  initialValues?: {
    name: string;
    description?: string;
    pricePerHour: string;
    image: string;
    isActive: boolean;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const form = useForm<CourtFormSchema>({
    resolver: zodResolver(courtFormSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      pricePerHour: initialValues?.pricePerHour ?? "",
      image: initialValues?.image ?? "",
      isActive: initialValues?.isActive ?? true,
    },
  });

  const onSubmit = form.handleSubmit(async (data: CourtFormSchema) => {
    setIsLoading(true);
    if (mode === "create") {
      const response = await courtServices.createCourt(data);
      if (response.status === 201) {
        toast.success(response.statusText || "Lapangan berhasil ditambahkan");
        form.reset();
        setIsOpen(false);
        refetchCourts();
      } else if (response.status === 401) {
        toast.error(response.statusText || "Unauthorized");
      } else if (response.status === 403) {
        toast.error(response.statusText || "Forbidden");
      } else {
        toast.error(
          response.statusText || "Terjadi kesalahan saat menambahkan lapangan"
        );
      }
    } else {
      const response = await courtServices.updateCourt(courtId as string, data);
      if (response.status === 200) {
        toast.success(response.statusText || "Lapangan berhasil diubah");
        form.reset(data);
        setIsOpen(false);
        refetchCourts();
      } else if (response.status === 401) {
        toast.error(response.statusText || "Unauthorized");
      } else if (response.status === 403) {
        toast.error(response.statusText || "Forbidden");
      } else {
        toast.error(
          response.statusText || "Terjadi kesalahan saat menambahkan lapangan"
        );
      }
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
    isOpen,
    setIsOpen,
  };
};
