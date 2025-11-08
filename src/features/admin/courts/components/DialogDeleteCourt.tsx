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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, OctagonAlert, Trash2Icon } from "lucide-react";
import { useDialogDeleteCourt } from "../hooks/useDialogDeleteCourt";

const DialogDeleteCourt = ({
  courtId,
  courtName,
  refetch,
}: {
  courtId: string;
  courtName: string;
  refetch: () => void;
}) => {
  const {
    open,
    setOpen,
    isLoading,
    inputValue,
    handleInputChange,
    isInputValid,
    handleDelete,
  } = useDialogDeleteCourt(courtId, courtName, refetch);

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
        <Label htmlFor="name" className="font-normal">
          Ketik <span className="font-semibold">&quot;{courtName}&quot;</span>{" "}
          di bawah untuk mengonfirmasi
        </Label>
        <Input
          name="name"
          type="text"
          placeholder={`Ketik '${courtName}'`}
          value={inputValue}
          onChange={handleInputChange}
        />
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel type="button">Batal</AlertDialogCancel>
          <Button
            disabled={!isInputValid || isLoading}
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

export default DialogDeleteCourt;
