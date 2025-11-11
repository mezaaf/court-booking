import instance from "@/lib/axios/instance";
import { BookingFormSchema } from "../forms/bookingForm";

export const bookingServices = {
  getAvailableTime: async (id: string, date: string) => {
    return instance.get(
      `/courts/${id}/available-time${date ? `?date=${date}` : ""}`
    );
  },
  createBooking: async (data: BookingFormSchema) => {
    return instance.post("/bookings", data, {
      validateStatus: () => true,
    });
  },
};
