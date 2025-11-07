"use client";

import { authClient } from "@/server/auth/auth-client";
import { unauthorized } from "next/navigation";

const AdminPage = () => {
  const { data: session, isPending } = authClient.useSession();
  if (session?.user.role !== "admin" && !isPending) {
    return unauthorized();
  }
  return <div>Admin Page</div>;
};

export default AdminPage;
