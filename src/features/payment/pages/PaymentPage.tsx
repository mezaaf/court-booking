"use client";
import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BankAccount } from "@/generated/prisma/client";
import { convertIDR } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Calendar,
  CircleDollarSignIcon,
  Clock,
  CreditCard,
  CreditCardIcon,
  DollarSign,
  User,
} from "lucide-react";
import BankCard from "../components/BankCard";
import TransferPaymentForm from "../components/TransferPaymentForm";
import { usePaymentPage } from "../hooks/usePaymentPage";

const PaymentPage = () => {
  const {
    bookingId,
    bookingDetails,
    isLoadingBookingDetails,
    banks,
    isLoadingBanks,
    openForm,
    setOpenForm,
    isLoading,
    handleCashlessPayment,
  } = usePaymentPage();
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-16 sm:py-20 lg:py-24 items-center min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-3xl font-bold text-green-500">
          Booking Berhasil!
        </h1>
        <p>
          Silahkan pilih metode pembayaran untuk menyelesaikan proses booking
          Anda.
        </p>
      </div>
      <div className="w-full flex gap-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="pb-0">
            <CardTitle>Detail Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoadingBookingDetails ? (
              <p>Loading...</p>
            ) : bookingDetails ? (
              <>
                <p className="font-semibold">{bookingDetails?.court.name}</p>
                <p className="flex items-center gap-1">
                  <User className="size-4" />
                  Penyewa:{" "}
                  <span className="font-semibold">
                    {bookingDetails?.user.name}
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <Calendar className="size-4" /> Tanggal:
                  <span className="font-semibold">
                    {format(
                      new Date(bookingDetails?.date),
                      "EEEE, dd MMM yyyy",
                      {
                        locale: id,
                      }
                    )}
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="size-4" />
                  Waktu:{" "}
                  <span className="font-semibold">
                    {bookingDetails?.startTime} - {bookingDetails?.endTime} WIB
                  </span>
                </p>
                <Separator className="my-2" />
                <p className="flex items-center gap-1">
                  Status:{" "}
                  <Badge
                    className={`capitalize ${
                      bookingDetails?.status === "PENDING"
                        ? "bg-amber-100 text-amber-600"
                        : bookingDetails?.status === "CONFIRMED"
                        ? "bg-green-100 text-green-600"
                        : bookingDetails?.status === "CANCELLED"
                        ? "bg-red-100 text-red-600"
                        : "bg-sky-100 text-gray-700"
                    }`}
                  >
                    {bookingDetails?.status}
                  </Badge>
                </p>
                <p className="flex items-center gap-1">
                  <DollarSign className="size-4" />
                  Total:{" "}
                  <span className="font-semibold">
                    {convertIDR(bookingDetails?.totalPrice)}
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <CreditCard className="size-4" />
                  Metode Pembayaran:{" "}
                  <span className="font-semibold">Transfer</span>
                </p>
              </>
            ) : (
              <p>Data tidak ditemukan</p>
            )}
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
};

export default PaymentPage;
