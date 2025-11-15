import UserBookingPage from "@/features/user/bookings/pages/UserBookingPage";
import { Suspense } from "react";

const UserBookingPageWrapper = () => {
  return (
    <Suspense>
      <UserBookingPage />
    </Suspense>
  );
};

export default UserBookingPageWrapper;
