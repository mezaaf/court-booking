import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { bookingFormSchema, BookingFormSchema } from "../forms/bookingForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingServices } from "../services/bookingServices";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { formatDateToLocalYMD } from "@/lib/utils";
import courtServices from "@/features/admin/courts/services/courtServices";

export const useBookingForm = (
  setOpenTime: (openTime: string) => void,
  setClosedTime: (closedTime: string) => void,
  setIsClosed: (isClosed: boolean) => void,
  setBookedTimes: (
    bookedTimes: { startTime: string; endTime: string }[]
  ) => void,
  setAvailableTimes: (availableTimes: string[]) => void,
  setDate: (date: string) => void
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      courtId: "",
      date: undefined,
      startTime: "",
      endTime: "",
      note: "",
      totalPrice: 0,
    },
  });
  const onSubmit = form.handleSubmit(async (data: BookingFormSchema) => {
    setIsLoading(true);
    const res = await bookingServices.createBooking(data);
    if (res.status === 201) {
      toast.success("Berhasil", { description: res.statusText });
      setSelectedCourt("");
      setSelectedDate(null);
      setDate("");
      form.reset();
      router.push(`/payment?bookingId=${res.data.bookingId}`);
    } else if (res.status === 401) {
      router.push("/login?callbackUrl=/bookings");
    } else {
      toast.error("Gagal", { description: res.statusText });
    }
    setIsLoading(false);
  });

  const { data: courts = [], isLoading: isCourtsLoading } = useQuery({
    queryKey: ["courts-list-for-booking"],
    queryFn: async () => {
      const res = await courtServices.getAllActiveCourts();
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.data;
    },
  });

  const { data: availableTimes, isLoading: isAvailableTimesLoading } = useQuery(
    {
      queryKey: ["available-times", selectedCourt, selectedDate],
      queryFn: async () => {
        if (!selectedCourt || !selectedDate) return null;
        const res = await bookingServices.getAvailableTime(
          selectedCourt,
          formatDateToLocalYMD(selectedDate)
        );
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }

        return res.data;
      },
      enabled: !!selectedCourt && !!selectedDate,
    }
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const startTime = form.watch("startTime");
  const endTime = form.watch("endTime");

  useEffect(() => {
    if (!availableTimes) return;
    setOpenTime(availableTimes.openTime);
    setClosedTime(availableTimes.closeTime);
    setBookedTimes(availableTimes.bookedTimes ?? []);
    setAvailableTimes(availableTimes.times ?? []);
    setIsClosed(availableTimes.isClosed ?? false);

    if (!availableTimes || !startTime || !endTime) {
      form.setValue("totalPrice", 0);
      return;
    }

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    const minutesBooked = endH * 60 + endM - (startH * 60 + startM);
    if (minutesBooked <= 0) {
      form.setValue("totalPrice", 0);
      return;
    }

    const hoursBooked = minutesBooked / 60;
    const totalPrice = hoursBooked * availableTimes.pricePerHour;

    form.setValue("totalPrice", totalPrice);
  }, [
    availableTimes,
    form,
    startTime,
    endTime,
    setOpenTime,
    setClosedTime,
    setBookedTimes,
    setAvailableTimes,
    setIsClosed,
  ]);

  return {
    form,
    onSubmit,
    isLoading,
    courts,
    isCourtsLoading,
    setSelectedCourt,
    setSelectedDate,
    open,
    setOpen,
    isAvailableTimesLoading,
    availableTimes,
  };
};
