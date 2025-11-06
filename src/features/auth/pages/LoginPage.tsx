"use client";
import { authClient } from "@/server/auth/auth-client";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = ({
  searchParams,
}: {
  searchParams: Promise<{ redirect: string }>;
}) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const params = use(searchParams);

  useEffect(() => {
    if (session) {
      router.replace(params.redirect);
    }
  }, [session, router, params.redirect]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return <LoginForm />;
};

export default LoginPage;
