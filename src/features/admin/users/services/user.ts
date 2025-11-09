import instance from "@/lib/axios/instance";

const userService = {
  getAllUsers: (query: string, page: number, limit: number) =>
    instance.get(`/users?query=${query}&page=${page}&limit=${limit}`),
  deleteUser: (userId: string) => instance.delete(`/users/${userId}`),
};

export default userService;
