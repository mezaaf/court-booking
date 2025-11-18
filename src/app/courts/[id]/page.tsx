import DetailCourtPage from "@/features/courts/pages/DetailCourtPage";
import { Suspense } from "react";

const DetailCourtWrapper = () => {
  return (
    <Suspense>
      <DetailCourtPage />
    </Suspense>
  );
};

export default DetailCourtWrapper;
