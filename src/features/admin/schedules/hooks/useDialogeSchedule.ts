import { useState } from "react";
import { useForm } from "react-hook-form";
import { scheduleFormSchema, ScheduleFormSchema } from "../forms/scheduleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import adminScheduleServices from "@/services/admin/adminScheduleServices";
import { toast } from "sonner";
import { adminCourtServices } from "@/services/admin/adminCourtServices";
import { useQuery } from "@tanstack/react-query";

export const useDialogSchedule = (
  mode: "create" | "update",
  refetchSchedules: () => void,
  scheduleId?: string,
  initialValues?: {
    courtId: string;
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ScheduleFormSchema>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      courtId: initialValues?.courtId || "",
      dayOfWeek: initialValues?.dayOfWeek || "",
      openTime: initialValues?.openTime || "",
      closeTime: initialValues?.closeTime || "",
      isClosed: initialValues?.isClosed || false,
    },
  });

  const onSubmit = form.handleSubmit(async (data: ScheduleFormSchema) => {
    setIsLoading(true);
    if (mode === "create") {
      const response = await adminScheduleServices.createSchedule(data);
      console.log(response);
      if (response.status === 201) {
        toast.success("Berhasil", { description: response.statusText });
        refetchSchedules();
        form.reset();
        setIsOpen(false);
      } else {
        toast.error("Gagal", { description: response.statusText });
      }
    } else {
      const response = await adminScheduleServices.updateSchedule(
        scheduleId as string,
        data
      );
      if (response.status === 200) {
        toast.success("Berhasil", { description: response.statusText });
        refetchSchedules();
        form.reset();
        setIsOpen(false);
      } else {
        toast.error("Gagal", { description: response.statusText });
      }
    }
    setIsLoading(false);
  });

  const { data: courts = [], isLoading: isCourtsLoading } = useQuery({
    queryKey: ["courts-list-for-schedule-dialog", isOpen],
    queryFn: async () => {
      const res = await adminCourtServices.getAllCourts("", 1, 100);
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.data.courts;
    },
    enabled: isOpen,
  });

  return {
    isOpen,
    setIsOpen,
    isLoading,
    form,
    onSubmit,
    courts,
    isCourtsLoading,
  };
};
