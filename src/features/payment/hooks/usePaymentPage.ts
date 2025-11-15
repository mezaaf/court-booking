import instance from "@/lib/axios/instance";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const usePaymentPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

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

  return {
    bookingDetails,
    isLoadingBookingDetails,
  };
};
