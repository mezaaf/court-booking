"use client";
import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Edit2Icon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { scheduleFormSchema, ScheduleFormSchema } from "../forms/scheduleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import scheduleService from "../services/schedule";
import { toast } from "sonner";
import { DAY_OF_WEEK_LABELS } from "../constants/scheduleConstant";
import courtServices from "../../courts/services/courtServices";

const DialogSchedule = ({
  mode,
  refetchSchedules,
  scheduleId,
  initialValues,
}: {
  mode: "create" | "update";
  refetchSchedules: () => void;
  scheduleId?: string;
  initialValues?: {
    courtId: string;
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  };
}) => {
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
      const response = await scheduleService.createSchedule(data);
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
      const response = await scheduleService.updateSchedule(
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
      const res = await courtServices.getAllCourts("", 1, 100);
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.data.courts;
    },
    enabled: isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="bg-sky-700 hover:bg-sky-700/80 flex items-center gap-2">
            <PlusCircleIcon className="size-4" /> Tambah Jadwal
          </Button>
        ) : (
          <Button className="bg-amber-400 hover:bg-amber-400/80 flex items-center gap-2">
            <Edit2Icon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogTitle>
          {mode === "create"
            ? "Formulir Tambah Jadwal"
            : "Formulir Ubah Jadwal"}
        </DialogTitle>
        <DialogDescription />
        <form onSubmit={onSubmit} className="max-h-[80vh] overflow-y-auto">
          <FieldGroup className="">
            <Controller
              name="courtId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Lapangan</FieldLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lapangan" />
                    </SelectTrigger>
                    <SelectContent>
                      {isCourtsLoading ? (
                        <SelectItem disabled value="loading">
                          Memuat...
                        </SelectItem>
                      ) : (
                        courts.map((court: { id: string; name: string }) => (
                          <SelectItem key={court.id} value={court.id}>
                            {court.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="dayOfWeek"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Hari</FieldLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih hari" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(DAY_OF_WEEK_LABELS).map(
                        ([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="openTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Jam Buka</FieldLabel>
                    <Input {...field} type="time" step={60} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="closeTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Jam Tutup</FieldLabel>
                    <Input {...field} type="time" step={60} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* <Controller
              name="isActive"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Status Aktif</FieldLabel>
                  <div className="w-fit">
                    <Switch
                      className="cursor-pointer data-[state=checked]:bg-sky-700"
                      checked={field.value ?? isActive}
                      aria-invalid={fieldState.invalid}
                      onCheckedChange={(checked: boolean) => {
                        field.onChange(checked);
                        setIsActive(checked);
                      }}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}
            <SubmitLoadingButton
              className="w-fit"
              text="Simpan"
              loadingText="Menyimpan..."
              isLoading={isLoading}
            />
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSchedule;
