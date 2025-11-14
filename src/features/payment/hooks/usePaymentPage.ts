import instance from "@/lib/axios/instance";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { bankServices } from "../services/bankServices";
import { BankAccount } from "@/generated/prisma/client";
import { paymentServices } from "../services/paymentServices";
import { toast } from "sonner";

export const usePaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: bookingDetails, isLoading: isLoadingBookingDetails } = useQuery(
    {
      queryKey: ["booking-details", bookingId],
      queryFn: async () => {
        const res = await instance.get(`/bookings/${bookingId}`);
        if (res.status !== 200) return null;
        return res.data;
      },
    }
  );

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

  return {
    bookingId,
    bookingDetails,
    isLoadingBookingDetails,
    banks,
    isLoadingBanks,
    openForm,
    setOpenForm,
    isLoading,
    handleCashlessPayment,
  };
};
