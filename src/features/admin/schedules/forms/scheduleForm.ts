import z from "zod";

export const scheduleFormSchema = z.object({
  courtId: z.uuid({ message: "Lapangan harus dipilih" }),
  dayOfWeek: z
    .string("Hari harus dipilih")
    .min(1, { message: "Hari harus dipilih" }),
  openTime: z.string().min(1, { message: "Jam buka harus diisi" }),
  closeTime: z.string().min(1, { message: "Jam tutup harus diisi" }),
  isClosed: z.boolean().optional(),
});

export type ScheduleFormSchema = z.infer<typeof scheduleFormSchema>;
