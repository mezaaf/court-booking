"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { authClient } from "@/server/auth/auth-client";

const LogoutEverywhereButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogoutEverywhere = async () => {
    setIsLoading(true);
    await authClient.revokeSessions();
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
