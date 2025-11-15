import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertIDR } from "@/lib/utils";
import { Booking } from "@/types/booking";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Clock, CreditCard, DollarSign, User } from "lucide-react";

const BookingDetailCard = ({
  bookingDetails,
  isLoadingBookingDetails,
}: {
  bookingDetails: Booking | undefined;
  isLoadingBookingDetails: boolean;
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-0">
        <CardTitle>Detail Booking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoadingBookingDetails ? (
          <p>Loading booking details...</p>
        ) : bookingDetails ? (
          <>
            <p className="font-semibold">{bookingDetails?.court.name}</p>
            <p className="flex items-center gap-1">
              <User className="size-4" />
              Penyewa:{" "}
              <span className="font-semibold">{bookingDetails?.user.name}</span>
            </p>
            <p className="flex items-center gap-1">
              <Calendar className="size-4" /> Tanggal:
              <span className="font-semibold">
                {format(new Date(bookingDetails?.date), "EEEE, dd MMM yyyy", {
                  locale: id,
                })}
              </span>
            </p>
            <p className="flex items-center gap-1">
              <Clock className="size-4" />
              Waktu:{" "}
              <span className="font-semibold">
                {bookingDetails?.startTime} - {bookingDetails?.endTime} WIB
              </span>
            </p>
            <p className="flex items-center gap-1">
              Status Booking:{" "}
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
            <Separator className="my-2" />
            <div className="flex items-center gap-1">
              Status Pembayaran:{" "}
              {bookingDetails?.payments.length === 0 ? (
                <Badge className="bg-gray-100 text-gray-700">
                  Belum Dibayar
                </Badge>
              ) : (
                <Badge
                  className={`capitalize ${
                    bookingDetails?.payments[0]?.status === "PENDING"
                      ? "bg-amber-100 text-amber-600"
                      : bookingDetails?.payments[0]?.status === "CONFIRMED"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {bookingDetails?.payments[0]?.status}
                </Badge>
              )}
            </div>
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
              <span className="font-semibold">
                {bookingDetails?.payments[0]?.method || "-"}
              </span>
            </p>
          </>
        ) : (
          <p>Data booking tidak ditemukan.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingDetailCard;
