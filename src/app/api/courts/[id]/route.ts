import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const court = await prisma.court.findUnique({
      where: {
        id,
      },
      include: {
        schedules: {
          orderBy: {
            dayOfWeek: "asc",
          },
        },
      },
    });
    return NextResponse.json(court, {
      status: 200,
      statusText: "Court fetched successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      console.log("Error fetching court detail: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Unknown error occurred",
      });
    }
  }
}
