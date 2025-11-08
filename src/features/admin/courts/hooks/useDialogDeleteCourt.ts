import { useState } from "react";
import { toast } from "sonner";
import courtServices from "../services/court";

export const useDialogDeleteCourt = (
  courtId: string,
  courtName: string,
  refetch: () => void
) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const isInputValid = inputValue === courtName;
  const handleDelete = async () => {
    setIsLoading(true);
    if (!isInputValid) {
      toast.error("Nama lapangan tidak sesuai.");
    } else {
      const res = await courtServices.deleteCourt(courtId);
      if (res.data.status !== 200) {
        toast.error("Gagal menghapus lapangan.");
      } else {
        toast.success("Lapangan berhasil dihapus.");
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
