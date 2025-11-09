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
import { Switch } from "@/components/ui/switch";
import { PlusCircleIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { useDialogCreateUser } from "../hooks/useDialogCreateUser";

const DialogCreateUser = ({ refetchUsers }: { refetchUsers: () => void }) => {
  const { isOpen, setIsOpen, isLoading, form, onSubmit } =
    useDialogCreateUser(refetchUsers);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-sky-700 hover:bg-sky-700/80 flex items-center gap-2">
          <PlusCircleIcon className="size-4" /> Tambah User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogTitle>Formulir Tambah User</DialogTitle>
        <DialogDescription />
        <form onSubmit={onSubmit} className="max-h-[80vh] overflow-y-auto">
          <FieldGroup className="">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nama</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan nama"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Jadikan Admin</FieldLabel>
                  <div className="w-fit">
                    <Switch
                      className="cursor-pointer data-[state=checked]:bg-sky-700"
                      checked={field.value}
                      aria-invalid={fieldState.invalid}
                      onCheckedChange={(checked: boolean) => {
                        field.onChange(checked);
                      }}
                    />
                  </div>
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

export default DialogCreateUser;
