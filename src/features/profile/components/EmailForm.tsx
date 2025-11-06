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

const EmailForm = ({ email }: { email: string }) => {
  const form = useForm({
    defaultValues: { email },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubah Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="">
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
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

            <Button type="submit" className="bg-sky-700 hover:bg-sky-700/80">
              Kirim Permintaan
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailForm;
