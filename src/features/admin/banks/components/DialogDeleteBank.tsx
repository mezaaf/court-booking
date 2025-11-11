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
import { useState } from "react";
import { toast } from "sonner";
import { bankServices } from "../services/bankServices";

const DialogDeleteBank = ({
  bankId,
  accountNumber,
  refetch,
}: {
  bankId: string;
  accountNumber: string;
  refetch: () => void;
}) => {
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
      const res = await bankServices.deleteBank(bankId);
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
        <Label htmlFor="accountNumber" className="font-normal">
          Ketik{" "}
          <span className="font-semibold">&quot;{accountNumber}&quot;</span> di
          bawah untuk mengonfirmasi
        </Label>
        <Input
          autoFocus
          id="accountNumber"
          type="text"
          placeholder={`Ketik '${accountNumber}'`}
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

export default DialogDeleteBank;
