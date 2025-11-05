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
import { Controller, useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "../forms/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";
import Link from "next/link";

const LoginForm = () => {
  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit = form.handleSubmit(async (data: LoginFormSchema) => {
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi.");
    }
  });
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Masuk ke akun Anda</CardTitle>
          <CardDescription>
            Masukkan email Anda di bawah ini untuk masuk ke akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
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
              Masuk
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link
            href="/login"
            className="text-primary underline underline-offset-4 font-semibold"
          >
            Daftar
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
