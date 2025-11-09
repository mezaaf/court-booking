import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  const headers = {
    authorization: request.headers.get("authorization") ?? "",
    cookie: request.headers.get("cookie") ?? "",
  };

  const session = await auth.api.getSession({ headers });

  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
      total: 0,
      data: null,
    });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({
      status: 403,
      message: "Forbidden",
      total: 0,
      data: null,
    });
  }

  const offset = (page - 1) * limit;

  try {
    const where: Prisma.UserWhereInput = {
      AND: [
        query
          ? {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };
    const [total, users] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({
        orderBy: {
          name: "asc",
        },
        where,
        skip: offset,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: "Users fetched successfully",
      total,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching users",
      total: 0,
      data: null,
    });
  }
}
