"use client";

import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import { Button } from "@/components/ui/button";
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
import { BankAccount } from "@/generated/prisma/client";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useTransferPaymentForm } from "../hooks/useTransferPaymentForm";

const TransferPaymentForm = ({
  bookingId,
  banks,
}: {
  bookingId: string;
  banks: BankAccount[];
}) => {
  const {
    form,
    onSubmit,
    isLoading,
    handleChangeImage,
    imagePreview,
    handleRemoveImage,
  } = useTransferPaymentForm(bookingId);
  return (
    <form onSubmit={onSubmit} className="w-2xs">
      <FieldGroup>
        <Controller
          name="bankAccountId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.error}>
              <FieldLabel>Bank Tujuan</FieldLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bank tujuan" />
                </SelectTrigger>
                <SelectContent>
                  {banks?.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id}>
                      {bank.bankName} - {bank.accountNumber} - a.n{" "}
                      {bank.accountHolderName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="proofOfPayment"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Foto Lapangan</FieldLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleChangeImage(e)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {imagePreview && (
          <div className="relative aspect-square w-64 rounded-md overflow-hidden -mt-4">
            <Image
              src={imagePreview}
              alt="Preview"
              layout="fill"
              className="w-full h-full object-cover object-center"
            />
            <Button
              type="button"
              variant="outline"
              className="absolute top-2 right-2 size-6 rounded-full"
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              <XIcon className="size-4" />
            </Button>
          </div>
        )}
        <SubmitLoadingButton
          text="Kirim Bukti Pembayaran"
          loadingText="Mengirim..."
          isLoading={isLoading}
          className="w-full bg-sky-700 hover:bg-sky-700/80"
        />
      </FieldGroup>
    </form>
  );
};

export default TransferPaymentForm;
