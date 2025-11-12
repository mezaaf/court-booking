import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  const offset = (page - 1) * limit;
  try {
    const where: Prisma.CourtWhereInput = {
      AND: [
        query
          ? {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };
    const [total, courts] = await Promise.all([
      prisma.court.count(),
      prisma.court.findMany({
        orderBy: {
          name: "asc",
        },
        where,
        skip: offset,
        take: limit,
      }),
    ]);
    return NextResponse.json(
      {
        courts,
        total,
      },
      {
        status: 200,
        statusText: "Courts fetched successfully",
      }
    );
  } catch (error) {
    console.error("Error fetching courts: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error fetching courts",
    });
  }
}

export async function POST(req: Request) {
  const headers = {
    authorization: req.headers.get("authorization") ?? "",
    cookie: req.headers.get("cookie") ?? "",
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

  const data = await req.json();
  try {
    await prisma.court.create({
      data: {
        name: data.name,
        description: data.description === "" ? null : data.description,
        pricePerHour: Number(data.pricePerHour),
        image: data.image,
        isActive: data.isActive ?? true,
      },
    });
    return NextResponse.json(null, {
      status: 201,
      statusText: "Court created successfully",
    });
  } catch (error) {
    console.error("Error creating court: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error creating court",
    });
  }
}
