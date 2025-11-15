import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const headers = {
    authorization: req.headers.get("authorization") || "",
    cookie: req.headers.get("cookie") || "",
  };
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const session = await auth.api.getSession({ headers });
  if (!session) {
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const offset = (page - 1) * limit;
  try {
    const [total, bookings] = await Promise.all([
      prisma.booking.count({
        where: {
          userId: session.user.id,
        },
      }),
      prisma.booking.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          court: true,
          user: true,
          payments: true,
        },
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return NextResponse.json(
      { total, bookings },
      { status: 200, statusText: "Bookings retrieved successfully" }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      return NextResponse.json(null, {
        status: 500,
        statusText: "An unknown error occurred",
      });
    }
  }
}
