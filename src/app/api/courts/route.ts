import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
