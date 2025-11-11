import z from "zod";

export const bookingFormSchema = z.object({
  courtId: z.string().min(1, "Lapangan wajib diisi"),
  date: z.date().min(1, "Tanggal wajib diisi"),
  startTime: z.string().min(1, "Waktu mulai wajib diisi"),
  endTime: z.string().min(1, "Waktu selesai wajib diisi"),
  note: z.string().optional(),
  totalPrice: z.number().min(0, "Total harga wajib diisi"),
});

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
