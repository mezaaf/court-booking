import z from "zod";

export const bookingFormSchema = z.object({
  courtId: z.string().min(1, "Lapangan harus dipilih"),
  date: z.date("Tanggal wajib diisi").min(1, "Tanggal wajib diisi"),
});

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
