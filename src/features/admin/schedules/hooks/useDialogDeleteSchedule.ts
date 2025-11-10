import { useState } from "react";
import scheduleService from "../services/schedule";
import { toast } from "sonner";

export const useDialogDeleteSchedule = (
  scheduleId: string,
  refetch: () => void
) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await scheduleService.deleteSchedule(scheduleId);
    if (res.status !== 200) {
      toast.error("Gagal", { description: res.statusText });
    } else {
      toast.success("Berhasil", { description: res.statusText });
      refetch();
      setOpen(false);
    }
    setIsLoading(false);
  };

  return {
    open,
    setOpen,
    isLoading,
    handleDelete,
  };
};
