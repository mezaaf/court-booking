import { ScheduleFormSchema } from "@/features/admin/schedules/forms/scheduleForm";
import instance from "@/lib/axios/instance";

const adminScheduleServices = {
  getAllSchedules: async (page: number, limit: number) => {
    return instance.get(`/admin/schedules?page=${page}&limit=${limit}`);
  },
  createSchedule: async (data: ScheduleFormSchema) => {
    return instance.post("/admin/schedules", data);
  },
  updateSchedule: async (scheduleId: string, data: ScheduleFormSchema) => {
    return instance.put(`/admin/schedules/${scheduleId}`, data);
  },
  deleteSchedule: async (scheduleId: string) => {
    return instance.delete(`/admin/schedules/${scheduleId}`);
  },
};

export default adminScheduleServices;
