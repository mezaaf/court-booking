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
    return NextResponse.json({
      status: 200,
      message: "Active courts fetched successfully",
      data: activeCourts,
    });
  } catch (error) {
    console.error("Error fetching active courts: ", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching active courts",
      data: null,
    });
  }
}
