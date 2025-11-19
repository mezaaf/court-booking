"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/server/auth/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const AdminRevokeAllSessionForUser = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleRevokeAllSession = async () => {
    setIsLoading(true);
    const { error } = await authClient.admin.revokeUserSessions({
      userId,
    });
    if (error) {
      toast.error("Gagal logout dari semua perangkat.");
    }
    setIsLoading(false);
  };
  return (
    <Button
      onClick={handleRevokeAllSession}
      variant="destructive"
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? "Logging out..." : "Revoke Semua Sesi User"}
    </Button>
  );
};

export default AdminRevokeAllSessionForUser;
