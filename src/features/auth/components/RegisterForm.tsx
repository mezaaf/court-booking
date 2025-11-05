"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/server/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { RegisterFormSchema, registerFormSchema } from "../forms/authSchema";
import Link from "next/link";

const RegisterForm = () => {
  const form = useForm<RegisterFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = form.handleSubmit(async (data: RegisterFormSchema) => {
    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: `${window.location.origin}/login`,
      });
      if (error) {
        toast.error(error.message);
      }
      toast.success(
        "Berhasil mendaftar! Silakan periksa email Anda untuk verifikasi."
      );
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    }
  });

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Akun</CardTitle>
          <CardDescription>
            Masukkan email Anda di bawah ini untuk mendaftar akun baru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <FieldGroup>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nama</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nama lengkap Anda"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                      placeholder="Email Anda"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Password Anda"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button type="submit" className="w-full">
              Daftar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-primary underline underline-offset-4 font-semibold"
          >
            Masuk
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
