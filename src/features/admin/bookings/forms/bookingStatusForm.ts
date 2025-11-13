import { BookingStatus } from "@/generated/prisma/enums";
import z from "zod";

export const bookingStatusFormSchema = z.object({
  status: z.enum(BookingStatus, "Status wajib diisi"),
});

export type BookingStatusFormSchema = z.infer<typeof bookingStatusFormSchema>;
