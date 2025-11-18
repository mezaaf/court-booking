import { Court } from "@/generated/prisma/client";
import { courtServices } from "@/services/public/courtServices";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useCourtSection = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || 3;
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

  return {
    activeCourts,
    currentLimit,
    total,
  };
};
