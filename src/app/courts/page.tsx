import CourtsPage from "@/features/courts/pages/CourtsPage";
import { Suspense } from "react";

const CourtWrapper = () => {
  return (
    <Suspense>
      <CourtsPage />
    </Suspense>
  );
};

export default CourtWrapper;
