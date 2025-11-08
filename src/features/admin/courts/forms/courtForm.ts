import z from "zod";

export const courtFormSchema = z.object({
  name: z.string().min(1, "Nama lapangan wajib diisi"),
  description: z.string().optional(),
  pricePerHour: z.string().min(1, "Harga per jam wajib diisi"),
  image: z.string().min(1, "Foto lapangan wajib diisi"),
  isActive: z.boolean().optional(),
});

export type CourtFormSchema = z.infer<typeof courtFormSchema>;
