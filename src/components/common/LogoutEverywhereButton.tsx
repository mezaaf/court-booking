"use client";
import { authClient } from "@/server/auth/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const LogoutEverywhereButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogoutEverywhere = async () => {
    setIsLoading(true);
    const { error } = await authClient.revokeSessions();
    if (error) {
      toast.error("Gagal logout dari semua perangkat.");
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
