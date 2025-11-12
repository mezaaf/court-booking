import instance from "@/lib/axios/instance";
import { CreateUserFormSchema } from "../forms/userForm";

const userService = {
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

export default userService;
