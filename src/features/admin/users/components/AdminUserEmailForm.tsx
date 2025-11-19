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
import { useUpdateEmailForm } from "../hooks/useUpdateEmailForm";

const AdminUserEmailForm = ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  const { form, onSubmit, isLoading } = useUpdateEmailForm(email, userId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubah Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="newEmail"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan Email Anda"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <SubmitLoadingButton
              text="Ubah Email"
              loadingText="Mengubah..."
              isLoading={isLoading}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminUserEmailForm;
