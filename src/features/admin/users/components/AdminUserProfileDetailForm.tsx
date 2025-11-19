"use client";
import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "@/generated/prisma/client";
import { XIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { useUpdateProfileForm } from "../hooks/useUpdateProfileForm";

const AdminUserProfileDetailForm = ({ user }: { user: User }) => {
  const {
    form,
    onSubmit,
    isLoading,
    handleChangeImage,
    imagePreview,
    handleRemoveImage,
  } = useUpdateProfileForm(user);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Akun</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan Nama Anda"
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
                  <FieldLabel>Profile Image</FieldLabel>
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
              <div className="relative size-16">
                <UserAvatar
                  name={user.name}
                  image={imagePreview}
                  classname="size-16"
                />
                {imagePreview !== user.image && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute -top-2 -right-2 size-6 rounded-full"
                    onClick={handleRemoveImage}
                    aria-label="Remove image"
                  >
                    <XIcon className="size-4" />
                  </Button>
                )}
              </div>
            )}
            <SubmitLoadingButton
              text="Simpan Perubahan"
              loadingText="Menyimpan..."
              isLoading={isLoading}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminUserProfileDetailForm;
