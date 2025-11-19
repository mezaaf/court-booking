import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  const offset = (page - 1) * limit;

  const headers = {
    authorization: req.headers.get("authorization") || "",
    cookie: req.headers.get("cookie") || "",
  };
  const session = await auth.api.getSession({ headers });

  if (!session) {
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  try {
    const [total, payments] = await Promise.all([
      prisma.payment.count(),
      prisma.payment.findMany({
        include: {
          booking: {
            include: {
              user: true,
              court: true,
            },
          },
        },
        skip: offset,
        take: limit,
      }),
    ]);
    return NextResponse.json(
      { total, payments },
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      console.log("Error fetching payments: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
