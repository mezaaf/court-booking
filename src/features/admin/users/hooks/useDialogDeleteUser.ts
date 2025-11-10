import { useState } from "react";
import { toast } from "sonner";
import userService from "../services/user";

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
      const res = await userService.deleteUser(userId);
      if (res.status !== 200) {
        toast.error("Gagal", { description: res.statusText });
      } else {
        toast.success("Berhasil", { description: res.statusText });
        refetch();
        setOpen(false);
        setInputValue("");
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
