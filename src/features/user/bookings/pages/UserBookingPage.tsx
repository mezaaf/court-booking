"use client";

import PaginationData from "@/components/common/PaginationData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertIDR } from "@/lib/utils";
import { Booking } from "@/types/booking";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Clock, CreditCard, DollarSign, User } from "lucide-react";
import { userBookingServices } from "../services/userBookingServices";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserBookingPage = () => {
  const { data: bookingResponse, isLoading } = useQuery({
    queryKey: ["user-bookings"],
    queryFn: async () => {
      const res = await userBookingServices.getAllUserBookings();
      if (!res.data) return [];
      return res.data;
    },
  });

  const bookings: Booking[] = bookingResponse?.bookings || [];
  const total: number = bookingResponse?.total ?? 0;
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl px-4  sm:px-6 lg:px-8 mx-auto py-16 sm:py-20 lg:py-24">
      <h1 className="text-2xl font-bold">Riwayat Booking</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>Tidak ada riwayat booking.</p>
      ) : (
        <div className="w-full grid grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="w-full max-w-sm">
              <CardHeader className="pb-0">
                <CardTitle>Detail Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-semibold">{booking?.court.name}</p>
                <p className="flex items-center gap-1">
                  <User className="size-4" />
                  Penyewa:{" "}
                  <span className="font-semibold">{booking?.user.name}</span>
                </p>
                <p className="flex items-center gap-1">
                  <Calendar className="size-4" /> Tanggal:
                  <span className="font-semibold">
                    {format(new Date(booking?.date), "EEEE, dd MMM yyyy", {
                      locale: id,
                    })}
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="size-4" />
                  Waktu:{" "}
                  <span className="font-semibold">
                    {booking?.startTime} - {booking?.endTime} WIB
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  Status Booking:{" "}
                  <Badge
                    className={`capitalize ${
                      booking?.status === "PENDING"
                        ? "bg-amber-100 text-amber-600"
                        : booking?.status === "CONFIRMED"
                        ? "bg-green-100 text-green-600"
                        : booking?.status === "CANCELLED"
                        ? "bg-red-100 text-red-600"
                        : "bg-sky-100 text-gray-700"
                    }`}
                  >
                    {booking?.status}
                  </Badge>
                </p>
                <Separator className="my-2" />
                <div className="flex items-center gap-1">
                  Status Pembayaran:{" "}
                  {booking?.payments.length === 0 ? (
                    <div className="flex items-center justify-between gap-2">
                      <Badge className="bg-gray-100 text-gray-700">
                        Belum Dibayar
                      </Badge>
                      <Button asChild size="sm" className="rounded-full">
                        <Link href={`/payment?bookingId=${booking.id}`}>
                          Bayar
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Badge
                      className={`capitalize ${
                        booking?.payments[0]?.status === "PENDING"
                          ? "bg-amber-100 text-amber-600"
                          : booking?.payments[0]?.status === "CONFIRMED"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking?.payments[0]?.status}
                    </Badge>
                  )}
                </div>
                <p className="flex items-center gap-1">
                  <DollarSign className="size-4" />
                  Total:{" "}
                  <span className="font-semibold">
                    {convertIDR(booking?.totalPrice)}
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <CreditCard className="size-4" />
                  Metode Pembayaran:{" "}
                  <span className="font-semibold">
                    {booking?.payments[0]?.method || "-"}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <PaginationData total={total} />
    </div>
  );
};

export default UserBookingPage;
