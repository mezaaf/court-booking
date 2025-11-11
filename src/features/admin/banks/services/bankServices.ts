import instance from "@/lib/axios/instance";
import { BankFormSchema } from "../forms/bankForm";

export const bankServices = {
  getBanks: async (query: string, page: number, limit: number) => {
    return instance.get(`/banks?query=${query}&page=${page}&limit=${limit}`);
  },
  createBank: async (data: BankFormSchema) => {
    return instance.post("/banks", data, {
      validateStatus: () => true,
    });
  },
  updateBank: async (bankId: string, data: BankFormSchema) => {
    return instance.put(`/banks/${bankId}`, data, {
      validateStatus: () => true,
    });
  },
  deleteBank: async (bankId: string) => {
    return instance.delete(`/banks/${bankId}`, {
      validateStatus: () => true,
    });
  },
};
