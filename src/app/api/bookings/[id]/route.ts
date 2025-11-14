import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "Booking ID is required",
    });
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        court: true,
        user: true,
      },
    });
    return NextResponse.json(booking, {
      status: 200,
      statusText: "Booking fetched successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      console.log("Error fetching booking: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Unknown error",
      });
    }
  }
}
