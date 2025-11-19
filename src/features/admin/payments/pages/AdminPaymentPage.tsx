"use client";

import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import useDataTable from "@/hooks/useDataTable";
import { convertIDR } from "@/lib/utils";
import { adminPaymentServices } from "@/services/admin/adminPaymentServices";
import { Payment } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMemo } from "react";
import DialogConfirmPayment from "../components/DialogConfirmPayment";
import DialogPaymentProof from "../components/DialogPaymentProof";
import { ADMIN_PAYMENT_TABLE_HEADER } from "../constants/adminPaymentConstant";

const AdminPaymentPage = () => {
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
  const filteredData = useMemo(() => {
    const payments: Payment[] = paymentsResponse?.payments || [];
    return (payments || []).map((payment, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        format(new Date(payment.createdAt), "dd/MM/yyyy - HH:mm 'WIB'"),
        payment.booking.user.name,
        payment.booking.court.name,
        payment.booking.startTime + " - " + payment.booking.endTime + " WIB",
        convertIDR(payment.amount),
        <Badge
          key={payment.id}
          className={`capitalize ${
            payment.status === "PENDING"
              ? "bg-amber-100 text-amber-600"
              : payment.status === "CONFIRMED"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-gray-600"
          }`}
        >
          {payment.status}
        </Badge>,
        payment.method,
        payment.note || "-",
        <div key={payment.id} className="flex items-center justify-center">
          {payment.proofOfPayment ? (
            <DialogPaymentProof image={payment.proofOfPayment} />
          ) : (
            "-"
          )}
        </div>,
        payment.status === "PENDING" ? (
          <DialogConfirmPayment
            key={payment.id}
            paymentId={payment.id}
            refetchPayments={refetchPayments}
          />
        ) : (
          "-"
        ),
      ];
    });
  }, [currentLimit, currentPage, paymentsResponse?.payments, refetchPayments]);
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Bank</h1>
        <div className="flex items-center gap-4"></div>
      </div>
      <DataTable
        header={ADMIN_PAYMENT_TABLE_HEADER}
        isLoading={isLoading}
        data={filteredData}
        total={total}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default AdminPaymentPage;
