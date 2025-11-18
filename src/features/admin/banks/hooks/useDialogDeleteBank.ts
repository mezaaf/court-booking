import { adminBankServices } from "@/services/admin/adminBankServices";
import { useState } from "react";
import { toast } from "sonner";

export const useDialogDeleteBank = (
  bankId: string,
  accountNumber: string,
  refetch: () => void
) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isInputValid = inputValue === accountNumber;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleDelete = async () => {
    setIsLoading(true);
    if (!isInputValid) {
      toast.error("Nomor rekening tidak sesuai.");
    } else {
      const res = await adminBankServices.deleteBank(bankId);
      if (res.status !== 200) {
        toast.error("Gagal", { description: res.statusText });
      } else {
        toast.success("Berhasil", { description: res.statusText });
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
    isInputValid,
    handleInputChange,
    handleDelete,
  };
};
