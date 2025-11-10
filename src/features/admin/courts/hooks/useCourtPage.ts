import useDataTable from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import courtServices from "../services/court";
import { Court } from "@/generated/prisma/client";

export const useCourtPage = () => {
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  } = useDataTable();

  const {
    data: courtsResponse,
    isLoading,
    refetch: refetchCourts,
  } = useQuery({
    queryKey: ["courts", currentSearch, currentPage, currentLimit],
    queryFn: async () => {
      const res = await courtServices.getAllCourts(
        currentSearch,
        currentPage,
        currentLimit
      );
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res;
    },
  });

  const courts = courtsResponse?.data.courts as Court[];
  const total = courtsResponse?.data.total as number;

  return {
    courts,
    total,
    isLoading,
    refetchCourts,
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  };
};
