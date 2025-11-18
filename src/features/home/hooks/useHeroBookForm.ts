import { Court } from "@/generated/prisma/client";
import { courtServices } from "@/services/public/courtServices";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { bookingFormSchema, BookingFormSchema } from "../forms/booking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingServices } from "@/services/public/bookingServices";
import { ScheduleData } from "@/types/scheduleData";

export const useHeroBookForm = (
  setDialogOpen: (open: boolean) => void,
  setScheduleData: (data: ScheduleData) => void
) => {
  const { data: activeCourts } = useQuery({
    queryKey: ["allActiveCourts"],
    queryFn: async () => {
      const res = await courtServices.getAllActiveCourts(
        undefined,
        undefined,
        true
      );
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.data as Court[];
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      courtId: "",
      date: undefined,
    },
  });

  const onSubmit = form.handleSubmit(async (data: BookingFormSchema) => {
    setIsLoading(true);
    const res = await bookingServices.getAvailableTime(
      data.courtId,
      data.date.toISOString()
    );
    if (res.status === 200) {
      setDialogOpen(true);
      setScheduleData(res.data);
    }
    setIsLoading(false);
  });

  return {
    activeCourts,
    form,
    onSubmit,
    isLoading,
    open,
    setOpen,
  };
};
