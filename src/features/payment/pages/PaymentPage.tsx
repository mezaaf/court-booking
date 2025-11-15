"use client";
import BookingDetailCard from "../components/BookingDetailCard";
import PaymentDetailCard from "../components/PaymentDetailCard";
import { usePaymentPage } from "../hooks/usePaymentPage";

const PaymentPage = () => {
  const { bookingId } = usePaymentPage();
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
        <BookingDetailCard bookingId={bookingId} />
        <PaymentDetailCard bookingId={bookingId} />
      </div>
    </div>
  );
};

export default PaymentPage;
