import { BankFormSchema } from "@/features/admin/banks/forms/bankForm";
import instance from "@/lib/axios/instance";

export const adminBankServices = {
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
