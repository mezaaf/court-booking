import instance from "@/lib/axios/instance";
import { CreateCourtFormSchema } from "../forms/courtForm";

const courtServices = {
  getAllCourts: (query: string, page: number, limit: number) =>
    instance.get(`/courts?query=${query}&page=${page}&limit=${limit}`),
  // getCourtById: (id: string) => instance.get(`/courts/${id}`),
  createCourt: (data: CreateCourtFormSchema) => instance.post("/courts", data),
  // updateCourt: (id: string, data: any) => instance.put(`/courts/${id}`, data),
  deleteCourt: (id: string) => instance.delete(`/courts/${id}`),
};

export default courtServices;
