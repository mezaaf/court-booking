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
import { Textarea } from "@/components/ui/textarea";
import { Edit2Icon, PlusCircleIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useDialogCourt } from "../hooks/useDialogCourt";

const DialogCourt = ({
  mode,
  refetchCourts,
  courtId,
  initialValues,
}: {
  mode: "create" | "update";
  refetchCourts: () => void;
  courtId?: string;
  initialValues?: {
    name: string;
    description?: string;
    pricePerHour: string;
    image: string;
    isActive: boolean;
  };
}) => {
  const {
    form,
    onSubmit,
    isLoading,
    handleChangeImage,
    imagePreview,
    handleRemoveImage,
    isActive,
    setIsActive,
    isOpen,
    setIsOpen,
  } = useDialogCourt({ mode, refetchCourts, courtId, initialValues });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="bg-sky-700 hover:bg-sky-700/80 flex items-center gap-2">
            <PlusCircleIcon className="size-4" /> Tambah Lapangan
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
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nama Lapangan</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan nama lapangan"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Deskripsi Lapangan</FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan deskripsi lapangan"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="pricePerHour"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Harga Per Jam</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan harga per jam"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="image"
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Foto Lapangan</FieldLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChangeImage(e)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {imagePreview && (
              <div className="relative aspect-video w-64 rounded-md overflow-hidden -mt-4">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute -top-2 -right-2 size-6 rounded-full"
                  onClick={handleRemoveImage}
                  aria-label="Remove image"
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            )}
            <Controller
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

export default DialogCourt;
