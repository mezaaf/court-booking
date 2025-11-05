"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/server/auth/auth-client";

const HomePage = () => {
  const { data: session } = authClient.useSession();
  const handleLogout = async () => {
    await authClient.signOut();
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        {session?.user?.name || "Home Page"}
      </h1>
      {session && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
};

export default HomePage;
