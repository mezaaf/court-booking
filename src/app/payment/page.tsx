import PaymentPage from "@/features/payment/pages/PaymentPage";
import { Suspense } from "react";

const PaymentPageWrapper = () => {
  return (
    <Suspense>
      <PaymentPage />
    </Suspense>
  );
};

export default PaymentPageWrapper;
