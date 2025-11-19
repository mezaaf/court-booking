import { adminUserServices } from "@/services/admin/adminUserServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useAdminUserDetailPage = () => {
  const params = useParams();
  const userId = params.id as string;

  const { data: user } = useQuery({
    queryKey: ["admin-user-detail", userId],
    queryFn: async () => {
      const res = await adminUserServices.getUserById(userId);
      if (res.status !== 200) return null;
      return res.data;
    },
  });

  return { user };
};
