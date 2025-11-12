import instance from "@/lib/axios/instance";
import { BankFormSchema } from "../forms/bankForm";

export const bankServices = {
  getBanks: async (query: string, page: number, limit: number) => {
    return instance.get(
      `/admin/banks?query=${query}&page=${page}&limit=${limit}`
    );
  },
  createBank: async (data: BankFormSchema) => {
    return instance.post("/admin/banks", data, {
      validateStatus: () => true,
    });
  },
  updateBank: async (bankId: string, data: BankFormSchema) => {
    return instance.put(`/admin/banks/${bankId}`, data, {
      validateStatus: () => true,
    });
  },
  deleteBank: async (bankId: string) => {
    return instance.delete(`/admin/banks/${bankId}`, {
      validateStatus: () => true,
    });
  },
};
