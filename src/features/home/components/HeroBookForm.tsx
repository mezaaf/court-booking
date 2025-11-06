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
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const HeroBookForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  return (
    <div className="w-full max-w-3xl">
      <form action="" className="w-full">
        <FieldGroup>
          <div className="grid grid-cols-3 gap-4 w-full">
            <Controller
              name="court"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Select defaultValue="">
                    <SelectTrigger>
                      <SelectValue {...field} placeholder="Pilih Lapangan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="court1">Lapangan 1</SelectItem>
                      <SelectItem value="court2">Lapangan 2</SelectItem>
                      <SelectItem value="court3">Lapangan 3</SelectItem>
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
