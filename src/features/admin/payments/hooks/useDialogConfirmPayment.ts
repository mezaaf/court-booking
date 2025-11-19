import { adminPaymentServices } from "@/services/admin/adminPaymentServices";
import { useState } from "react";
import { toast } from "sonner";

export const useDialogConfirmPayment = (
  paymentId: string,
  refetchPayments: () => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    const res = await adminPaymentServices.confirmPayment(paymentId);
    if (res.status === 200) {
      toast.success("Berhasil", { description: res.statusText });
      setOpen(false);
      refetchPayments();
    } else {
      toast.error("Gagal", { description: res.statusText });
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    open,
    setOpen,
    handleConfirmPayment,
  };
};
