import { Suspense } from "react";
import LoginPage from "@/features/auth/pages/LoginPage";

const LoginPageWrapper = () => {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
};

export default LoginPageWrapper;
