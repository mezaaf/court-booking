import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateUserFormSchema, createUserFormSchema } from "../forms/userForm";
import userService from "../services/user";

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
    const res = await userService.createUser(data);
    if (res.status !== 201) {
      toast.error("Gagal", { description: res.statusText });
    } else {
      toast.success("Berhasil", { description: res.statusText });
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
