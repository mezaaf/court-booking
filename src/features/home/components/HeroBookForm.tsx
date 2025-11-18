"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup } from "@/components/ui/field";
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
import { Court } from "@/generated/prisma/client";
import { courtServices } from "@/services/public/courtServices";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const HeroBookForm = () => {
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

  const [open, setOpen] = useState(false);
  const form = useForm();
  return (
    <div className="w-full max-w-3xl">
      <form action="" className="w-full">
        <FieldGroup>
          <div className="grid grid-cols-3 gap-4 w-full">
            <Controller
              name="courtId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Select defaultValue="">
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
                </Field>
              )}
            />
            <Button type="submit" className="bg-sky-700 hover:bg-sky-700/80">
              Cek Jadwal
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default HeroBookForm;
