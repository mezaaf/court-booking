import instance from "@/lib/axios/instance";

export const userBookingServices = {
  getAllUserBookings: (page = 1, limit = 10) => {
    return instance.get(`/user/bookings?page=${page}&limit=${limit}`);
  },
};
