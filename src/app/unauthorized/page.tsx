"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/server/auth/auth-client";
import Link from "next/link";

export default function UnauthorizedPage() {
  const session = authClient.useSession().data;
  if (!session) return null;
  return (
    <main className="flex grow items-center justify-center px-4 text-center py-16 sm:py-20 lg:py-24 min-h-screen">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - Unauthorized</h1>
          <p className="text-muted-foreground">
            {session.user.role !== "admin" &&
              "Anda tidak memiliki izin untuk mengakses halaman ini."}{" "}
            Mohon masuk untuk melanjutkan.
          </p>
        </div>
        <div>
          <Button asChild>
            <Link href="/login" className="bg-red-600 hover:bg-red-600/80">
              Masuk
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
