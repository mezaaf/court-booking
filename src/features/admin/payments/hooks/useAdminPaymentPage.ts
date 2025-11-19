import useDataTable from "@/hooks/useDataTable";
import { adminPaymentServices } from "@/services/admin/adminPaymentServices";
import { Payment } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";

export const useAdminPaymentPage = () => {
  const { currentPage, currentLimit, handlePageChange, handleLimitChange } =
    useDataTable();

  const {
    data: paymentsResponse,
    isLoading,
    refetch: refetchPayments,
  } = useQuery({
    queryKey: ["admin-payments", currentPage, currentLimit],
    queryFn: async () => {
      const res = await adminPaymentServices.getAllPayments(
        currentPage,
        currentLimit
      );
      if (res.status !== 200) return null;
      return res.data;
    },
  });
  const total: number = paymentsResponse?.total || 0;
  const payments: Payment[] = paymentsResponse?.payments || [];

  return {
    payments,
    isLoading,
    refetchPayments,
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
    total,
  };
};
