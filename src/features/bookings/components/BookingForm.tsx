"use client";

import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { convertIDR } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { useBookingForm } from "../hooks/useBookingForm";

const BookingForm = ({
  setOpenTime,
  setClosedTime,
  setIsClosed,
  setBookedTimes,
  setAvailableTimes,
  setDate,
}: {
  setOpenTime: (openTime: string) => void;
  setClosedTime: (closedTime: string) => void;
  setIsClosed: (isClosed: boolean) => void;
  setBookedTimes: (
    bookedTimes: { startTime: string; endTime: string }[]
  ) => void;
  setAvailableTimes: (availableTimes: string[]) => void;
  setDate: (date: string) => void;
}) => {
  const {
    form,
    onSubmit,
    isLoading,
    setSelectedCourt,
    setSelectedDate,
    availableTimes,
    open,
    setOpen,
    courts,
    isCourtsLoading,
    isAvailableTimesLoading,
  } = useBookingForm(
    setOpenTime,
    setClosedTime,
    setIsClosed,
    setBookedTimes,
    setAvailableTimes,
    setDate
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulir Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="w-full">
          <FieldGroup className="">
            <Controller
              name="courtId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Lapangan</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCourt(value);
                    }}
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
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tanggal</FieldLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {field.value
                          ? format(field.value, "EEEE, dd MMMM yyyy", {
                              locale: id,
                            })
                          : "Pilih Tanggal"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        locale={id}
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          if (!date) return;
                          field.onChange(date);
                          setSelectedDate(date);
                          setDate(
                            format(date, "EEEE, dd MMMM yyyy", { locale: id })
                          );
                          setOpen(false);
                        }}
                        disabled={{
                          before: new Date(),
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="startTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Waktu Mulai</FieldLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih waktu mulai" />
                      </SelectTrigger>
                      <SelectContent>
                        {!availableTimes ? (
                          <SelectItem disabled value="no-available-time">
                            Tidak ada waktu tersedia
                          </SelectItem>
                        ) : isAvailableTimesLoading ? (
                          <SelectItem disabled value="loading">
                            Memuat...
                          </SelectItem>
                        ) : (
                          (availableTimes.startTimes || []).map(
                            (time: string, index: number) => (
                              <SelectItem
                                key={`start-time-${index}`}
                                value={time}
                              >
                                {time}
                              </SelectItem>
                            )
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
              <Controller
                name="endTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Waktu Selesai</FieldLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih waktu selesai" />
                      </SelectTrigger>
                      <SelectContent>
                        {!availableTimes ? (
                          <SelectItem disabled value="no-available-time">
                            Tidak ada waktu tersedia
                          </SelectItem>
                        ) : isAvailableTimesLoading ? (
                          <SelectItem disabled value="loading">
                            Memuat...
                          </SelectItem>
                        ) : (
                          (availableTimes.endTimes || []).map(
                            (time: string, index: number) => (
                              <SelectItem
                                key={`start-time-${index}`}
                                value={time}
                              >
                                {time}
                              </SelectItem>
                            )
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
            </div>
            <Controller
              name="note"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Catatan (Opsional)</FieldLabel>
                  <Textarea
                    {...field}
                    data-invalid={fieldState.invalid}
                    placeholder="Tambahkan catatan untuk bookingan Anda"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="totalPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Total Harga</FieldLabel>
                  <Input
                    disabled
                    value={
                      field.value ? convertIDR(field.value) : convertIDR(0)
                    }
                    data-invalid={fieldState.invalid}
                    placeholder="Total harga akan muncul di sini"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <SubmitLoadingButton
              className="w-fit"
              text="Booking Sekarang"
              loadingText="Memproses..."
              isLoading={isLoading}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
