import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BankAccount } from "@/generated/prisma/client";
import { CircleDollarSignIcon, CreditCardIcon } from "lucide-react";
import BankCard from "./BankCard";
import TransferPaymentForm from "./TransferPaymentForm";
import { usePaymentDetailCard } from "../hooks/usePaymentDetailCard";

const PaymentDetailCard = ({ bookingId }: { bookingId: string | null }) => {
  const {
    banks,
    isLoadingBanks,
    openForm,
    setOpenForm,
    isLoading,
    handleCashlessPayment,
  } = usePaymentDetailCard(bookingId);
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-4">
        <CardTitle className="w-2xs">Detail Pembayaran</CardTitle>
        <CardTitle>Informasi Bank</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex flex-col gap-4 w-2xs">
          <div className="flex items-center gap-4">
            <SubmitLoadingButton
              text={
                <div className="flex items-center gap-2">
                  <CircleDollarSignIcon />
                  Cash
                </div>
              }
              loadingText="Memproses..."
              isLoading={isLoading}
              onClick={handleCashlessPayment}
              className="bg-green-600 hover:bg-green-600/80"
            />
            <Button
              onClick={() => setOpenForm(true)}
              className="bg-sky-700 hover:bg-sky-700/80"
            >
              <CreditCardIcon /> Transfer
            </Button>
          </div>
          {openForm && (
            <TransferPaymentForm
              bookingId={bookingId as string}
              banks={banks as BankAccount[]}
            />
          )}
        </div>
        {openForm && (
          <div className="flex flex-col gap-4 w-full">
            {isLoadingBanks ? (
              <p>Loading banks...</p>
            ) : (
              banks?.map((bank) => (
                <BankCard
                  key={bank.id}
                  bankName={bank.bankName}
                  accountNumber={bank.accountNumber}
                  accountHolder={bank.accountHolderName}
                />
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentDetailCard;
