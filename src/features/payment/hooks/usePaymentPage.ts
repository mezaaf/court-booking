import { useSearchParams } from "next/navigation";

export const usePaymentPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return {
    bookingId,
  };
};
