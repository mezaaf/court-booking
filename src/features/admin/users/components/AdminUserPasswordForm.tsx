"use client";
import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { useUpdatePasswordForm } from "../hooks/useUpdatePasswordForm";

const AdminUserPasswordForm = ({ userId }: { userId: string }) => {
  const { form, isLoading, onSubmit } = useUpdatePasswordForm(userId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubah Kata Sandi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Kata Sandi Baru</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan Kata Sandi Baru"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <SubmitLoadingButton
              text="Ubah Kata Sandi"
              loadingText="Mengubah..."
              isLoading={isLoading}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminUserPasswordForm;
