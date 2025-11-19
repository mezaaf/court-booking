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
import { adminPaymentServices } from "@/services/admin/adminPaymentServices";
import { OctagonAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DialogConfirmPayment = ({
  paymentId,
  refetchPayments,
}: {
  paymentId: string;
  refetchPayments: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    const res = await adminPaymentServices.confirmPayment(paymentId);
    if (res.status === 200) {
      toast.success("Berhasil", { description: res.statusText });
      setOpen(false);
      refetchPayments();
    } else {
      toast.error("Gagal", { description: res.statusText });
    }
    setIsLoading(false);
  };
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
