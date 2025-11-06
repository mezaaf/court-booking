"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { authClient } from "@/server/auth/auth-client";
import UserDropdown from "./UserDropdown";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const disableNavbar = [
    "login",
    "register",
    "admin",
    "not-found",
    "unauthorized",
  ];

  if (disableNavbar.includes(pathname.split("/")[1] ?? "")) return null;

  return (
    <div className="w-full fixed h-16 sm:h-18 lg:h-20 bg-sky-700 flex items-center justify-center">
      <div className="w-full max-w-7xl px-3 sm:px-5 lg:px-7 mx-auto flex items-center justify-between">
        <Link href={"/"} className="w-32">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={200}
            height={50}
            className="w-full object-cover object-center"
          />
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-white font-semibold">
            Home
          </Link>
          <Link href="/contact" className="text-white font-semibold">
            Contact
          </Link>
          <Link href="/about" className="text-white font-semibold">
            Booking
          </Link>
          {!session?.user && !isPending ? (
            <Link href="/login">
              <Button className="bg-red-600 hover:bg-red-600/80">Masuk</Button>
            </Link>
          ) : (
            <>{user && <UserDropdown user={user} />}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
