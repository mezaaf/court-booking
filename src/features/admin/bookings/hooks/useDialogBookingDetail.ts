import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  bookingStatusFormSchema,
  BookingStatusFormSchema,
} from "../forms/bookingStatusForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Booking } from "@/types/booking";
import { adminBookingServices } from "@/services/admin/adminBookingServices";

export const useDialogBookingDetail = (
  booking: Booking,
  refetchBooking: () => void
) => {
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

  return { isOpen, setIsOpen, form, isLoading, onSubmit };
};
