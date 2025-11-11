"use client";

import DataTable from "@/components/common/DataTable";
import { useMemo } from "react";
import DialogBank from "../components/DialogBank";
import DialogDeleteBank from "../components/DialogDeleteBank";
import { BANK_TABLE_HEADER } from "../constants/bankConstant";
import { useBankPage } from "../hooks/useBankPage";

const BankPage = () => {
  const {
    banks,
    total,
    isLoading,
    refetchBanks,
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
  } = useBankPage();
  const filteredData = useMemo(() => {
    return (banks || []).map((bank, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        bank.bankName,
        bank.accountNumber,
        bank.accountHolderName,
        <div key={bank.id} className="flex items-center gap-2">
          <DialogBank
            mode="update"
            refetchBanks={refetchBanks}
            bankId={bank.id}
            initialValues={{
              bankName: bank.bankName,
              accountNumber: bank.accountNumber,
              accountHolderName: bank.accountHolderName,
            }}
          />

          <DialogDeleteBank
            bankId={bank.id}
            accountNumber={bank.accountNumber}
            refetch={refetchBanks}
          />
        </div>,
      ];
    });
  }, [banks, currentLimit, currentPage, refetchBanks]);
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Bank</h1>
        <div className="flex items-center gap-4">
          <DialogBank mode="create" refetchBanks={refetchBanks} />
        </div>
      </div>
      <DataTable
        header={BANK_TABLE_HEADER}
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

export default BankPage;
