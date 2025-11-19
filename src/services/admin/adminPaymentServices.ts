import instance from "@/lib/axios/instance";

export const adminPaymentServices = {
  getAllPayments: async (page: number = 1, limit: number = 10) => {
    return instance.get(`/admin/payment?page=${page}&limit=${limit}`);
  },
  confirmPayment: async (id: string) => {
    return instance.put(`/admin/payment/${id}`, null, {
      validateStatus: () => true,
    });
  },
};
