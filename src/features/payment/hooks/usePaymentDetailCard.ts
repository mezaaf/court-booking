import { useState } from "react";
import { bankServices } from "../services/bankServices";
import { BankAccount } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import { paymentServices } from "../services/paymentServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const usePaymentDetailCard = (bookingId: string | null) => {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: banks, isLoading: isLoadingBanks } = useQuery({
    queryKey: ["banks-list-for-payment"],
    queryFn: async () => {
      const res = await bankServices.getBanks();
      if (res.status !== 200) return [];
      return res.data.banks as BankAccount[];
    },
  });

  const handleCashlessPayment = async () => {
    setIsLoading(true);
    const payload = {
      bookingId: bookingId as string,
    };
    const res = await paymentServices.createCashlessPayment(payload);
    if (res.status === 201) {
      toast.success("Berhasil", { description: res.statusText });
      router.push("/user/bookings");
    } else {
      toast.error("Gagal", { description: res.statusText });
    }
    setIsLoading(false);
  };

  const handleAlreadyPaid = () => {
    toast.error("Pembayaran sudah dilakukan sebelumnya.", {
      description: "Silakan cek riwayat booking Anda.",
    });
  };

  return {
    banks,
    isLoadingBanks,
    openForm,
    setOpenForm,
    isLoading,
    handleCashlessPayment,
    handleAlreadyPaid,
  };
};
