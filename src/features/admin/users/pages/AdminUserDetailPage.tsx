"use client";

import { adminUserServices } from "@/services/admin/adminUserServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AdminUserEmailForm from "../components/AdminUserEmailForm";
import AdminUserPasswordForm from "../components/AdminUserPasswordForm";
import AdminUserProfileDetailForm from "../components/AdminUserProfileDetailForm";
import AdminRevokeAllSessionForUser from "../components/AdminRevokeAllSessionForUser";

const AdminUserDetailPage = () => {
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

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <h1 className="text-2xl font-bold">Detail User</h1>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          {user && <AdminUserProfileDetailForm user={user} />}
          {user && <AdminRevokeAllSessionForUser userId={user.id} />}
        </div>
        <div className="flex-1 space-y-6">
          {user && <AdminUserEmailForm userId={user.id} email={user.email} />}
          {user && <AdminUserPasswordForm userId={user.id} />}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
