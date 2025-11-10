import useDataTable from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import scheduleService from "../services/schedule";
import { Schedule } from "@/types/schedule";

export const useSchedulePage = () => {
  const { currentPage, currentLimit, handlePageChange, handleLimitChange } =
    useDataTable();

  const {
    data: scheduleResponse,
    isLoading,
    refetch: refetchSchedules,
  } = useQuery({
    queryKey: ["schedules", currentPage, currentLimit],
    queryFn: async () => {
      const res = await scheduleService.getAllSchedules(
        currentPage,
        currentLimit
      );
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res;
    },
  });

  const schedules = scheduleResponse?.data.schedules as Schedule[];
  const total = scheduleResponse?.data.total;

  return {
    schedules,
    isLoading,
    refetchSchedules,
    currentPage,
    currentLimit,
    total,
    handlePageChange,
    handleLimitChange,
  };
};
