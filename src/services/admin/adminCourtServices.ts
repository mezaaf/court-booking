import { CourtFormSchema } from "@/features/admin/courts/forms/courtForm";
import instance from "@/lib/axios/instance";

export const adminCourtServices = {
  getAllCourts: (query: string, page: number, limit: number) =>
    instance.get(`/admin/courts?query=${query}&page=${page}&limit=${limit}`),
  getAllActiveCourts: (page?: number, limit?: number) =>
    instance.get(`/courts?page=${page}&limit=${limit}`),
  createCourt: (data: CourtFormSchema) => instance.post("/admin/courts", data),
  updateCourt: (id: string, data: CourtFormSchema) =>
    instance.put(`/admin/courts/${id}`, data),
  deleteCourt: (id: string) => instance.delete(`/admin/courts/${id}`),
};
