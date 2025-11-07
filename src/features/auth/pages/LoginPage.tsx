"use client";
import { authClient } from "@/server/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  useEffect(() => {
    if (session) {
      router.replace(redirect);
    }
  }, [session, router, redirect]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return <LoginForm />;
};

export default LoginPage;
