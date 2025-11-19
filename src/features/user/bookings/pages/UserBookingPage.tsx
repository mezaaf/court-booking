"use client";

import DetailBookingCard from "@/components/common/DetailBookingCard";
import PaginationData from "@/components/common/PaginationData";
import { useUserBookingPage } from "../hooks/useUserBookingPage";

const UserBookingPage = () => {
  const { bookings, total, isLoading } = useUserBookingPage();
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl px-4  sm:px-6 lg:px-8 mx-auto py-16 sm:py-20 lg:py-24 min-h-screen">
      <h1 className="text-2xl font-bold">Riwayat Booking</h1>
      <div className="w-full grid grid-cols-3 gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p>Belum ada riwayat booking.</p>
        ) : (
          bookings.map((booking) => (
            <DetailBookingCard
              key={booking.id}
              booking={booking}
              isLoading={isLoading}
            />
          ))
        )}
      </div>
      <PaginationData total={total} isLimit={false} />
    </div>
  );
};

export default UserBookingPage;
