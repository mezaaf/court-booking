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
import { Edit2Icon, PlusCircleIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { BankFormSchema } from "../forms/bankForm";
import { useBankDialog } from "../hooks/useBankDialog";

const DialogBank = ({
  mode,
  refetchBanks,
  bankId,
  initialValues,
}: {
  mode: "create" | "update";
  refetchBanks: () => void;
  bankId?: string;
  initialValues?: BankFormSchema;
}) => {
  const { isOpen, setIsOpen, isLoading, form, onSubmit } = useBankDialog({
    mode,
    bankId,
    initialValues,
    refetchBanks,
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="bg-sky-700 hover:bg-sky-700/80 flex items-center gap-2">
            <PlusCircleIcon className="size-4" /> Tambah Bank
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
            ? "Formulir Tambah Lapangan"
            : "Formulir Ubah Lapangan"}
        </DialogTitle>
        <DialogDescription />
        <form onSubmit={onSubmit} className="max-h-[80vh] overflow-y-auto">
          <FieldGroup className="">
            <Controller
              name="bankName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nama Bank</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan nama bank"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="accountHolderName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nama Pemilik Rekening</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan nama pemilik rekening"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="accountNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nomor Rekening</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan nomor rekening"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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

export default DialogBank;
