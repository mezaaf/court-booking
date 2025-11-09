import { authClient } from "@/server/auth/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export const useDialogDeleteUser = (
  userId: string,
  name: string,
  refetch: () => void
) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const isInputValid = inputValue === name;
  const handleDelete = async () => {
    setIsLoading(true);
    if (!isInputValid) {
      toast.error("Nama pengguna tidak sesuai.");
    } else {
      const { error } = await authClient.admin.removeUser({
        userId,
      });
      if (error) {
        toast.error("Gagal menghapus pengguna.");
      } else {
        toast.success("Pengguna berhasil dihapus.");
        refetch();
        setOpen(false);
      }
    }
    setIsLoading(false);
  };

  return {
    open,
    setOpen,
    isLoading,
    inputValue,
    handleInputChange,
    isInputValid,
    handleDelete,
  };
};
