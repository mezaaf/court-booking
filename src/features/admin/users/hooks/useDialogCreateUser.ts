import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserFormSchema, createUserFormSchema } from "../forms/userForm";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";

export const useDialogCreateUser = (refetchUsers: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<CreateUserFormSchema>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: false,
    },
  });

  const onSubmit = form.handleSubmit(async (data: CreateUserFormSchema) => {
    setIsLoading(true);
    const { error } = await authClient.admin.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role === true ? "admin" : "user",
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("User created successfully");
      form.reset();
      refetchUsers();
      setIsOpen(false);
    }
    setIsLoading(false);
  });
  return {
    isOpen,
    setIsOpen,
    isLoading,
    form,
    onSubmit,
  };
};
