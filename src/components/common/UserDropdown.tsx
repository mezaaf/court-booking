"use client";
import { type User } from "@/server/auth/auth";
import { LogOutIcon, ShieldIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authClient } from "@/server/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserDropdown = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
          ) : (
            <UserIcon />
          )}
          <span className="max-w-18 truncate">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">
            <UserIcon className="size-4" /> <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {user.role === "admin" && <AdminItem />}
        <SignOutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

const AdminItem = () => {
  return (
    <DropdownMenuItem asChild className="cursor-pointer">
      <Link href="/admin">
        <ShieldIcon className="size-4" /> <span>Admin</span>
      </Link>
    </DropdownMenuItem>
  );
};

const SignOutItem = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("Gagal logout. Silakan coba lagi.", {
        description: error.message,
      });
    } else {
      router.push("/");
    }
  };
  return (
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
      <LogOutIcon className="size-4" /> <span>Sign Out</span>
    </DropdownMenuItem>
  );
};
