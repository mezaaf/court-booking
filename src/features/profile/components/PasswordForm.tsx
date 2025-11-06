"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";

const PasswordForm = () => {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubah Kata Sandi</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="">
          <FieldGroup>
            <Controller
              control={form.control}
              name="currentPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Kata Sandi Saat Ini</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan Kata Sandi Saat Ini"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="newPassword"
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
            <Button type="submit" className="bg-sky-700 hover:bg-sky-700/80">
              Ubah Kata Sandi
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordForm;
