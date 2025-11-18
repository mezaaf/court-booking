"use client";

import CourtCard from "@/components/common/CourtCard";
import PaginationData from "@/components/common/PaginationData";
import { Court } from "@/generated/prisma/client";
import { courtServices } from "@/services/public/courtServices";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const CourtsPage = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 6;
  const { data: activeCourtsResponse } = useQuery({
    queryKey: ["paginationActiveCourts", currentPage, currentLimit],
    queryFn: async () => {
      const res = await courtServices.getAllActiveCourts(
        currentPage,
        currentLimit
      );
      if (res.status !== 200) return [];
      return res.data;
    },
  });

  const activeCourts: Court[] = activeCourtsResponse?.activeCourts || [];
  const total = activeCourtsResponse?.total || 0;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 min-h-screen">
      <h1 className="text-center font-bold text-4xl text-sky-700">
        Lapangan Kami
      </h1>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {activeCourts &&
          activeCourts.map((court) => (
            <CourtCard
              id={court.id}
              key={court.id}
              title={court.name}
              price={court.pricePerHour}
              img={court.image || ""}
            />
          ))}
      </div>
      <PaginationData limit={currentLimit} total={total} isLimit={false} />
    </div>
  );
};

export default CourtsPage;
