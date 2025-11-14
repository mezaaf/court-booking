import z from "zod";

export const transferPaymentFormSchema = z.object({
  bankAccountId: z.string().min(1, "Pilih rekening bank tujuan."),
  proofOfPayment: z.string().min(1, "Bukti pembayaran wajib diisi."),
});

export type TransferPaymentFormSchema = z.infer<
  typeof transferPaymentFormSchema
>;
