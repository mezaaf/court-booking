import useDataTable from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import { Schedule } from "@/types/schedule";
import adminScheduleServices from "@/services/admin/adminScheduleServices";

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
      const res = await adminScheduleServices.getAllSchedules(
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
