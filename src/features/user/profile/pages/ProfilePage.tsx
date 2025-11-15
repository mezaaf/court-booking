"use client";

import LogoutEverywhereButton from "@/components/common/LogoutEverywhereButton";
import { authClient } from "@/server/auth/auth-client";
import EmailForm from "../components/EmailForm";
import PasswordForm from "../components/PasswordForm";
import ProfileDetailsForm from "../components/ProfileDetailsForm";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  if (!session && !isPending) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-screen py-16 sm:py-20 lg:py-24">
      <div className="space-y-6 w-full">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Akun Saya</h1>
          <p className="text-muted-foreground">
            Ubah detail akun, email, dan kata sandi Anda di sini.
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            {user && <ProfileDetailsForm user={user} />}
          </div>
          <div className="flex-1 space-y-6">
            {user && <EmailForm email={user.email} />}
            <PasswordForm />
            <LogoutEverywhereButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
