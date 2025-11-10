"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader, OctagonAlert, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import scheduleService from "../services/schedule";

const DialogDeleteSchedule = ({
  scheduleId,
  refetch,
}: {
  scheduleId: string;
  refetch: () => void;
}) => {
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

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"}>
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle>
            <div className="bg-destructive/10 mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full">
              <OctagonAlert className="text-destructive h-7 w-7" />
            </div>
            Apakah Anda Benar - Benar Yakin?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Tindakan ini akan menghapus data secara permanen dan tidak dapat
            dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel type="button">Batal</AlertDialogCancel>
          <Button
            disabled={isLoading}
            onClick={handleDelete}
            variant={"destructive"}
            className="ml-2"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" /> Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDeleteSchedule;
