import { userBookingServices } from "@/services/user/userBookingServices";
import { Booking } from "@/types/booking";
import { useQuery } from "@tanstack/react-query";

export const useUserBookingPage = () => {
  const { data: bookingResponse, isLoading } = useQuery({
    queryKey: ["user-bookings"],
    queryFn: async () => {
      const res = await userBookingServices.getAllUserBookings();
      if (!res.data) return [];
      return res.data;
    },
  });

  const bookings: Booking[] = bookingResponse?.bookings || [];
  const total: number = bookingResponse?.total ?? 0;

  return { bookings, total, isLoading };
};
