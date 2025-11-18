import useDataTable from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import { BankAccount } from "@/generated/prisma/client";
import { adminBankServices } from "@/services/admin/adminBankServices";

export const useBankPage = () => {
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handlePageChange,
    handleLimitChange,
  } = useDataTable();
  const {
    data: banksResponse,
    isLoading,
    refetch: refetchBanks,
  } = useQuery({
    queryKey: ["banks", currentSearch, currentPage, currentLimit],
    queryFn: async () => {
      const res = await adminBankServices.getBanks(
        currentSearch,
        currentPage,
        currentLimit
      );
      return res;
    },
  });

  const banks: BankAccount[] = banksResponse?.data.banks;
  const total: number = banksResponse?.data.total || 0;

  return {
    banks,
    total,
    isLoading,
    refetchBanks,
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
  };
};
