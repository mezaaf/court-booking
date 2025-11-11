import z from "zod";

export const bankFormSchema = z.object({
  bankName: z.string().min(1, "Nama bank wajib diisi"),
  accountHolderName: z.string().min(1, "Nama pemilik rekening wajib diisi"),
  accountNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, { message: "Nomor rekening harus berisi angka saja." })
    .min(8, { message: "Nomor rekening terlalu pendek (minimal 8 digit)." })
    .max(20, {
      message: "Nomor rekening terlalu panjang (maksimal 20 digit).",
    }),
});

export type BankFormSchema = z.infer<typeof bankFormSchema>;
