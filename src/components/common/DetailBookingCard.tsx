import { Calendar, Clock, CreditCard, DollarSign, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { convertIDR } from "@/lib/utils";
import { Booking } from "@/types/booking";

const DetailBookingCard = ({
  booking,
  withPayButton = true,
  isLoading,
}: {
  booking: Booking;
  withPayButton?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-0">
        <CardTitle>Detail Booking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading ? (
          <p>Loading booking details...</p>
        ) : (
          <>
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
                  {withPayButton && (
                    <Button asChild size="sm" className="rounded-full">
                      <Link href={`/payment?bookingId=${booking.id}`}>
                        Bayar
                      </Link>
                    </Button>
                  )}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailBookingCard;
