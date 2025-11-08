import instance from "@/lib/axios/instance";
import { CourtFormSchema } from "../forms/courtForm";

const courtServices = {
  getAllCourts: (query: string, page: number, limit: number) =>
    instance.get(`/courts?query=${query}&page=${page}&limit=${limit}`),
  // getCourtById: (id: string) => instance.get(`/courts/${id}`),
  createCourt: (data: CourtFormSchema) => instance.post("/courts", data),
  updateCourt: (id: string, data: CourtFormSchema) =>
    instance.put(`/courts/${id}`, data),
  deleteCourt: (id: string) => instance.delete(`/courts/${id}`),
};

export default courtServices;
