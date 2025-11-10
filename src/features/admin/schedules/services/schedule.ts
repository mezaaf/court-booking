import instance from "@/lib/axios/instance";
import { ScheduleFormSchema } from "../forms/scheduleForm";

const scheduleService = {
  getAllschedules: async (page: number, limit: number) => {
    return instance.get(`/schedules?page=${page}&limit=${limit}`);
  },
  createSchedule: async (data: ScheduleFormSchema) => {
    return instance.post("/schedules", data);
  },
  updateSchedule: async (scheduleId: string, data: ScheduleFormSchema) => {
    return instance.put(`/schedules/${scheduleId}`, data);
  },
  deleteSchedule: async (scheduleId: string) => {
    return instance.delete(`/schedules/${scheduleId}`);
  },
};

export default scheduleService;
