"use client";

import useDataTable from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import { adminBookingServices } from "../services/adminBookingServices";
import { useMemo } from "react";
import { Booking } from "@/types/booking";
import DataTable from "@/components/common/DataTable";
import { BOOKING_TABLE_HEADER } from "../constants/bookingConstant";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import DialogBookingDetail from "../components/DialogBookingDetail";

const AdminBookingPage = () => {
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

  const filteredData = useMemo(() => {
    const bookings: Booking[] = bookingsResponse?.bookings || [];
    return bookings.map((booking, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        format(new Date(booking.date), "EEEE, dd MMM yyyy", { locale: id }),
        booking.user.name,
        booking.court.name,
        `${booking.startTime} - ${booking.endTime} WIB`,
        <Badge
          key={booking.id}
          className={`capitalize ${
            booking.status === "PENDING"
              ? "bg-amber-100 text-amber-600"
              : booking.status === "CONFIRMED"
              ? "bg-green-100 text-green-600"
              : booking.status === "CANCELLED"
              ? "bg-red-100 text-red-600"
              : "bg-sky-100 text-gray-700"
          }`}
        >
          {booking.status}
        </Badge>,
        <DialogBookingDetail
          key={booking.id}
          booking={booking}
          refetchBooking={refetchBookings}
        />,
      ];
    });
  }, [bookingsResponse?.bookings, currentLimit, currentPage, refetchBookings]);
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Booking</h1>
        <div className="flex items-center gap-4">
          {/* <DialogBank mode="create" refetchBanks={refetchBanks} /> */}
        </div>
      </div>
      <DataTable
        header={BOOKING_TABLE_HEADER}
        isLoading={isBookingLoading}
        data={filteredData}
        total={total}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default AdminBookingPage;
