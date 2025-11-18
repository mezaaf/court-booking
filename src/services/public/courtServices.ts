import instance from "@/lib/axios/instance";

export const courtServices = {
  getAllActiveCourts: (page?: number, limit?: number) =>
    instance.get(`/courts?page=${page}&limit=${limit}`),
};
