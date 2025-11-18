"use client";

import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
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
import { ScheduleData } from "@/types/scheduleData";
import { ChevronDownIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { useHeroBookForm } from "../hooks/useHeroBookForm";

const HeroBookForm = ({
  setDialogOpen,
  setScheduleData,
}: {
  setDialogOpen: (open: boolean) => void;
  setScheduleData: (data: ScheduleData) => void;
}) => {
  const { activeCourts, form, onSubmit, isLoading, open, setOpen } =
    useHeroBookForm(setDialogOpen, setScheduleData);
  return (
    <div className="w-full max-w-3xl">
      <form className="w-full" onSubmit={onSubmit}>
        <FieldGroup>
          <div className="grid grid-cols-3 gap-4 w-full">
            <Controller
              name="courtId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue {...field} placeholder="Pilih Lapangan" />
                    </SelectTrigger>
                    <SelectContent>
                      {(activeCourts || []).map((court) => (
                        <SelectItem key={court.id} value={court.id}>
                          {court.name}
                        </SelectItem>
                      ))}
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
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Pilih Tanggal"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
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
            <SubmitLoadingButton
              isLoading={isLoading}
              text="Cek Jadwal"
              loadingText="Mengecek..."
            />
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default HeroBookForm;
