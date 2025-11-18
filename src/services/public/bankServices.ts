import instance from "@/lib/axios/instance";

export const bankServices = {
  getBanks: async () => {
    return instance.get("/banks");
  },
};
