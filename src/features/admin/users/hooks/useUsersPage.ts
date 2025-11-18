import { User } from "@/generated/prisma/client";
import useDataTable from "@/hooks/useDataTable";
import { adminUserServices } from "@/services/admin/adminUserServices";
import { useQuery } from "@tanstack/react-query";

export const useUsersPage = () => {
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  } = useDataTable();
  const {
    data: usersResponse,
    isLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users", currentSearch, currentPage, currentLimit],
    queryFn: async () => {
      const res = await adminUserServices.getAllUsers(
        currentSearch,
        currentPage,
        currentLimit
      );
      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
      return res;
    },
  });

  const users = usersResponse?.data.data as User[];
  const total = usersResponse?.data.total;

  return {
    users,
    total: total || 0,
    isLoading,
    currentPage,
    currentLimit,
    currentSearch,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
    refetchUsers,
  };
};
