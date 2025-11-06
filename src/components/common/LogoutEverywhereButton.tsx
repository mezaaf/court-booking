"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { authClient } from "@/server/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutEverywhereButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogoutEverywhere = async () => {
    setIsLoading(true);
    const { error } = await authClient.revokeSessions();
    if (error) {
      toast.error("Gagal logout dari semua perangkat.");
    } else {
      router.replace("/");
    }
    setIsLoading(false);
  };
  return (
    <Button
      onClick={handleLogoutEverywhere}
      variant="destructive"
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? "Logging out..." : "Logout dari Semua Perangkat"}
    </Button>
  );
};

export default LogoutEverywhereButton;
