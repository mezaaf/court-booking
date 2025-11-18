"use client";
import DetailBookingCard from "@/components/common/DetailBookingCard";
import PaymentDetailCard from "../components/PaymentDetailCard";
import { usePaymentPage } from "../hooks/usePaymentPage";

const PaymentPage = () => {
  const { bookingDetails, isLoadingBookingDetails } = usePaymentPage();
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-16 sm:py-20 lg:py-24 items-center min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-3xl font-bold text-green-500">
          Booking Berhasil!
        </h1>
        <p>
          Silahkan pilih metode pembayaran untuk menyelesaikan proses booking
          Anda.
        </p>
      </div>
      <div className="w-full flex gap-4">
        <DetailBookingCard
          booking={bookingDetails}
          isLoading={isLoadingBookingDetails}
          withPayButton={false}
        />
        <PaymentDetailCard
          bookingId={bookingDetails?.id || null}
          paymentStatus={bookingDetails?.payments[0]?.status || null}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
