import instance from "@/lib/axios/instance";

export const courtServices = {
  getAllActiveCourts: (page?: number, limit?: number, all?: boolean) =>
    instance.get(`/courts?page=${page}&limit=${limit}&all=${all}`),
  getCourtById: (id: string) => instance.get(`/courts/${id}`),
};
