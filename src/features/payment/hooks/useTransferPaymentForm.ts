import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  transferPaymentFormSchema,
  TransferPaymentFormSchema,
} from "../forms/paymentForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransferPaymentPayload } from "@/types/payment";
import { paymentServices } from "../services/paymentServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useTransferPaymentForm = (bookingId: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TransferPaymentFormSchema>({
    resolver: zodResolver(transferPaymentFormSchema),
    defaultValues: {
      bankAccountId: "",
      proofOfPayment: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: TransferPaymentFormSchema) => {
      setIsLoading(true);
      const payload: TransferPaymentPayload = {
        ...data,
        bookingId: bookingId as string,
      };
      const res = await paymentServices.createTransferPayment(payload);
      if (res.status === 201) {
        toast.success("Berhasil", { description: res.statusText });
        router.push("/user/bookings");
      } else {
        toast.error("Gagal", { description: res.statusText });
      }
      setIsLoading(false);
    }
  );

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue("proofOfPayment", base64String, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const imagePreview = form.watch("proofOfPayment");

  const handleRemoveImage = () => {
    form.setValue("proofOfPayment", "", { shouldDirty: true });
  };

  return {
    form,
    onSubmit,
    isLoading,
    handleChangeImage,
    imagePreview,
    handleRemoveImage,
  };
};
