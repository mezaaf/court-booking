"use client";
import SubmitLoadingButton from "@/components/common/SubmitLoadingButton";
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
import { OctagonAlert } from "lucide-react";
import { useDialogConfirmPayment } from "../hooks/useDialogConfirmPayment";

const DialogConfirmPayment = ({
  paymentId,
  refetchPayments,
}: {
  paymentId: string;
  refetchPayments: () => void;
}) => {
  const { isLoading, open, setOpen, handleConfirmPayment } =
    useDialogConfirmPayment(paymentId, refetchPayments);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-500/80">
          Konfirmasi
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle>
            <div className="bg-amber-300/10 mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full">
              <OctagonAlert className="text-amber-400 h-7 w-7" />
            </div>
            Apakah Anda Benar - Benar Yakin?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Tindakan ini akan mengubah data secara permanen dan tidak dapat
            dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel type="button">Batal</AlertDialogCancel>
          <SubmitLoadingButton
            type="button"
            text="Konfirmasi Pembayaran"
            loadingText="Mengonfirmasi..."
            isLoading={isLoading}
            onClick={handleConfirmPayment}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogConfirmPayment;
