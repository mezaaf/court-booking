import instance from "@/lib/axios/instance";
import { CourtFormSchema } from "../forms/courtForm";

const courtServices = {
  getAllCourts: (query: string, page: number, limit: number) =>
    instance.get(`/admin/courts?query=${query}&page=${page}&limit=${limit}`),
  getAllActiveCourts: () => instance.get("/courts"),
  createCourt: (data: CourtFormSchema) => instance.post("/admin/courts", data),
  updateCourt: (id: string, data: CourtFormSchema) =>
    instance.put(`/admin/courts/${id}`, data),
  deleteCourt: (id: string) => instance.delete(`/admin/courts/${id}`),
};

export default courtServices;
