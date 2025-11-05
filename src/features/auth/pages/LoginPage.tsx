"use client";
import { authClient } from "@/server/auth/auth-client";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return <LoginForm />;
};

export default LoginPage;
