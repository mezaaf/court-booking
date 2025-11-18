import { BookingFormSchema } from "@/features/bookings/forms/bookingForm";
import instance from "@/lib/axios/instance";

export const bookingServices = {
  getAvailableTime: async (id: string, date: string) => {
    return instance.get(
      `courts/${id}/available-time${date ? `?date=${date}` : ""}`
    );
  },
  createBooking: async (data: BookingFormSchema) => {
    return instance.post("/bookings", data, {
      validateStatus: () => true,
    });
  },
};
