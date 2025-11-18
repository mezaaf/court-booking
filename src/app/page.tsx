import HomePage from "@/features/home/pages/HomePage";
import React, { Suspense } from "react";

const HomePageWrapper = () => {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
};

export default HomePageWrapper;
