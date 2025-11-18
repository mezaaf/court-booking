"use client";

import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/booking";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useMemo } from "react";
import DialogBookingDetail from "../components/DialogBookingDetail";
import { BOOKING_TABLE_HEADER } from "../constants/bookingConstant";
import { useBookingPage } from "../hooks/useBookingPage";

const AdminBookingPage = () => {
  const {
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
    bookingsResponse,
    isBookingLoading,
    refetchBookings,
    total,
  } = useBookingPage();

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
