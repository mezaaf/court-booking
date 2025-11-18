import useDataTable from "@/hooks/useDataTable";
import { adminBookingServices } from "@/services/admin/adminBookingServices";
import { useQuery } from "@tanstack/react-query";

export const useBookingPage = () => {
  const { currentPage, currentLimit, handlePageChange, handleLimitChange } =
    useDataTable();
  const {
    data: bookingsResponse,
    isLoading: isBookingLoading,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["admin-bookings", currentPage, currentLimit],
    queryFn: async () => {
      const res = await adminBookingServices.getAllBookings(
        currentPage,
        currentLimit
      );
      return res.data;
    },
  });

  const total = bookingsResponse?.total || 0;

  return {
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
    bookingsResponse,
    isBookingLoading,
    refetchBookings,
    total,
  };
};
