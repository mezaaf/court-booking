"use client";

import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { convertIDR } from "@/lib/utils";
import { format } from "date-fns";
import { useMemo } from "react";
import DialogConfirmPayment from "../components/DialogConfirmPayment";
import DialogPaymentProof from "../components/DialogPaymentProof";
import { ADMIN_PAYMENT_TABLE_HEADER } from "../constants/adminPaymentConstant";
import { useAdminPaymentPage } from "../hooks/useAdminPaymentPage";

const AdminPaymentPage = () => {
  const {
    payments,
    isLoading,
    refetchPayments,
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
    total,
  } = useAdminPaymentPage();
  const filteredData = useMemo(() => {
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
  }, [currentLimit, currentPage, payments, refetchPayments]);
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
