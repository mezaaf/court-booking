import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");
  const all = searchParams.get("all") === "true";
  try {
    if (all === true) {
      const activeCourts = await prisma.court.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      return NextResponse.json(activeCourts, {
        status: 200,
        statusText: "Active courts fetched successfully",
      });
    }
    if (!isNaN(page) && !isNaN(limit)) {
      const [total, activeCourts] = await Promise.all([
        prisma.court.count({
          where: {
            isActive: true,
          },
        }),
        prisma.court.findMany({
          where: {
            isActive: true,
          },
          orderBy: {
            name: "asc",
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      return NextResponse.json(
        { total, activeCourts },
        {
          status: 200,
          statusText: "Active courts fetched successfully",
        }
      );
    }
    const activeCourts = await prisma.court.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(activeCourts, {
      status: 200,
      statusText: "Active courts fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching active courts: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error fetching active courts",
    });
  }
}
