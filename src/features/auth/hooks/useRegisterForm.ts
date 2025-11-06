import { useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormSchema } from "../forms/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useRegisterForm = () => {
  const router = useRouter();
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
        image: "/images/user.jpg",
        callbackURL: `${window.location.origin}/login`,
      });
      if (error) {
        toast.error(error.message);
      } else {
        form.reset();
        toast.success(
          "Berhasil mendaftar! Silakan periksa email Anda untuk verifikasi."
        );
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    }
  });

  return { form, onSubmit };
};
