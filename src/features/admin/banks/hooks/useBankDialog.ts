import { useState } from "react";
import { useForm } from "react-hook-form";
import { bankFormSchema, BankFormSchema } from "../forms/bankForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankServices } from "../services/bankServices";
import { toast } from "sonner";

export const useBankDialog = ({
  mode,
  bankId,
  initialValues,
  refetchBanks,
}: {
  mode: "create" | "update";
  bankId?: string;
  initialValues?: BankFormSchema;
  refetchBanks: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<BankFormSchema>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      bankName: initialValues?.bankName ?? "",
      accountNumber: initialValues?.accountNumber ?? "",
      accountHolderName: initialValues?.accountHolderName ?? "",
    },
  });
  const onSubmit = form.handleSubmit(async (data: BankFormSchema) => {
    setIsLoading(true);
    if (mode === "create") {
      const res = await bankServices.createBank(data);
      if (res.status === 201) {
        toast.success("Berhasil", { description: res.statusText });
        refetchBanks();
        setIsOpen(false);
        form.reset();
      } else {
        toast.error("Gagal", { description: res.statusText });
      }
    } else {
      const res = await bankServices.updateBank(bankId!, data);
      if (res.status === 200) {
        toast.success("Berhasil", { description: res.statusText });
        form.reset(data);
        refetchBanks();
        setIsOpen(false);
      } else {
        toast.error("Gagal", { description: res.statusText });
      }
    }
    setIsLoading(false);
  });

  return {
    isOpen,
    setIsOpen,
    isLoading,
    form,
    onSubmit,
  };
};
