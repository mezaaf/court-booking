import { auth } from "@/server/auth/auth";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const adminRoutes = ["/admin", "/admin/*"];
const protectedRoutes = ["/admin", "/user"];

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const callbackUrl = pathname + nextUrl.search;

  if (session && (pathname === "/login" || pathname === "/register")) {
    const url = nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname === "/user") {
    const url = nextUrl.clone();
    url.pathname = "/user/profile";
    return NextResponse.redirect(url);
  }
  if (protectedRoutes.some((route) => pathname.match(route))) {
    if (!session) {
      const url = nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", callbackUrl);
      return NextResponse.redirect(url);
    }
  }

  if (adminRoutes.some((route) => pathname.match(route))) {
    if (session?.user.role !== "admin") {
      const url = nextUrl.clone();
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/data|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
