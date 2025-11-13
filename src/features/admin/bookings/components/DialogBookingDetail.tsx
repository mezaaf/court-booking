"use client";

import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BookingStatus } from "@/generated/prisma/enums";
import { convertIDR } from "@/lib/utils";
import { Booking } from "@/types/booking";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  EyeIcon,
  User,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  bookingStatusFormSchema,
  BookingStatusFormSchema,
} from "../forms/bookingStatusForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminBookingServices } from "../services/adminBookingServices";
import { toast } from "sonner";

const DialogBookingDetail = ({
  booking,
  refetchBooking,
}: {
  booking: Booking;
  refetchBooking: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<BookingStatusFormSchema>({
    resolver: zodResolver(bookingStatusFormSchema),
    defaultValues: {
      status: booking.status,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    const res = await adminBookingServices.updateBookingStatus(
      booking.id,
      data
    );
    if (res.status === 200) {
      toast.success("Berhasil", { description: res.statusText });
      form.reset(data);
      refetchBooking();
      setIsOpen(false);
    } else {
      toast.error("Gagal", { description: res.statusText });
    }
    setIsLoading(false);
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-400 hover:bg-amber-400/80">
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Detail</DialogTitle>
          <DialogDescription />
          <div className="flex flex-col">
            <p className="font-semibold">{booking.court.name}</p>
            <p className="flex items-center gap-1">
              <User className="size-4" />
              Penyewa:{" "}
              <span className="font-semibold">{booking.user.name}</span>
            </p>
            <p className="flex items-center gap-1">
              <Calendar className="size-4" /> Tanggal:
              <span className="font-semibold">
                {format(new Date(booking.date), "EEEE, dd MMM yyyy", {
                  locale: id,
                })}
              </span>
            </p>
            <p className="flex items-center gap-1">
              <Clock className="size-4" />
              Waktu:{" "}
              <span className="font-semibold">
                {booking.startTime} - {booking.endTime} WIB
              </span>
            </p>
            <Separator className="my-2" />
            <p className="flex items-center gap-1">
              Status:{" "}
              <Badge
                className={`capitalize ${
                  booking.status === "PENDING"
                    ? "bg-amber-100 text-amber-600"
                    : booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-600"
                    : booking.status === "CANCELLED"
                    ? "bg-red-100 text-red-600"
                    : "bg-sky-100 text-gray-700"
                }`}
              >
                {booking.status}
              </Badge>
            </p>
            <p className="flex items-center gap-1">
              <DollarSign className="size-4" />
              Total:{" "}
              <span className="font-semibold">
                {convertIDR(booking.totalPrice)}
              </span>
            </p>
            <p className="flex items-center gap-1">
              <CreditCard className="size-4" />
              Metode Pembayaran: <span className="font-semibold">Transfer</span>
            </p>
          </div>
          <Separator className="my-2" />
          <form onSubmit={onSubmit} className="max-h-[80vh] overflow-y-auto">
            <FieldGroup>
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Ubah Status</FieldLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(BookingStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Pastikan anda sudah memeriksa data pembayaran user.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <SubmitLoadingButton
                className="w-fit"
                text="Ubah Status"
                loadingText="Mengubah..."
                isLoading={isLoading}
              />
            </FieldGroup>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBookingDetail;
