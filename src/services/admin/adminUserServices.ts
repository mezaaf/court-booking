import { CreateUserFormSchema } from "@/features/admin/users/forms/userForm";
import instance from "@/lib/axios/instance";

export const adminUserServices = {
  getAllUsers: (query: string, page: number, limit: number) =>
    instance.get(`/admin/users?query=${query}&page=${page}&limit=${limit}`),
  createUser: (data: CreateUserFormSchema) =>
    instance.post("/admin/users", data, {
      validateStatus: () => true,
    }),
  deleteUser: (userId: string) =>
    instance.delete(`/admin/users/${userId}`, {
      validateStatus: () => true,
    }),
};
