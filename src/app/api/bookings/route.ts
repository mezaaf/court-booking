import { BookingFormSchema } from "@/features/bookings/forms/bookingForm";
import { BookingStatus } from "@/generated/prisma/enums";
import { timeToMinutes } from "@/lib/utils";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
  const data: BookingFormSchema = await req.json();
  if (timeToMinutes(data.endTime) <= timeToMinutes(data.startTime)) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "Waktu selesai harus lebih besar dari waktu mulai",
    });
  }
  try {
    const existingBooking = await prisma.booking.findFirst({
      where: {
        courtId: data.courtId,
        date: data.date,
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
        OR: [
          {
            startTime: {
              lt: data.endTime,
            },
            endTime: {
              gt: data.startTime,
            },
          },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json(null, {
        status: 409,
        statusText: "Waktu yang dipilih sudah terbooking",
      });
    }
    await prisma.booking.create({
      data: {
        userId: session.user.id,
        courtId: data.courtId,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        note: data.note === "" ? null : data.note,
        totalPrice: data.totalPrice,
        status: BookingStatus.PENDING,
      },
    });
    return NextResponse.json(null, {
      status: 201,
      statusText: "Booking created successfully",
    });
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
