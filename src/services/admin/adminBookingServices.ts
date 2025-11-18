import { BookingStatusFormSchema } from "@/features/admin/bookings/forms/bookingStatusForm";
import instance from "@/lib/axios/instance";

export const adminBookingServices = {
  getAllBookings: (page: number, limit: number) => {
    return instance.get(`/admin/bookings?${page}&limit=${limit}`);
  },
  updateBookingStatus: (id: string, data: BookingStatusFormSchema) => {
    return instance.put(`/admin/bookings/${id}`, data);
  },
};
