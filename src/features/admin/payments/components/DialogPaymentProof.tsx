import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const DialogPaymentProof = ({ image }: { image: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square w-10 overflow-hidden cursor-pointer">
          <Image
            src={image}
            alt="Bukti Pembayaran"
            width={40}
            height={40}
            className="w-full object-cover object-center"
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bukti Pembayaran</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          <Image
            src={image}
            alt="Bukti Pembayaran"
            width={800}
            height={800}
            className="object-cover object-center"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPaymentProof;
