import { BookingStatus } from "@/generated/prisma/enums";
import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dateParam = req.nextUrl.searchParams.get("date");
  if (!dateParam)
    return NextResponse.json(null, {
      status: 400,
      statusText: "Date is required",
    });

  const date = new Date(dateParam);

  const jsDay = date.getDay();
  const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1;

  try {
    const schedule = await prisma.schedule.findFirst({
      where: {
        courtId: id,
        dayOfWeek,
      },
    });

    if (!schedule || schedule.isClosed) {
      return NextResponse.json(
        {
          openTime: null,
          closeTime: null,
          isClosed: true,
          bookedTimes: [],
          times: [],
          startTimes: [],
          endTimes: [],
          pricePerHour: 0,
        },
        {
          status: 200,
          statusText: "Court is closed on this date",
        }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        courtId: id,
        date: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lte: new Date(date.setHours(23, 59, 59, 999)),
        },
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
      },
    });

    const [openH, openM] = schedule.openTime.split(":").map(Number);
    const [closeH, closeM] = schedule.closeTime.split(":").map(Number);
    const slotMinutes = 60;
    const slots: string[] = [];
    let current = openH * 60 + openM;
    const end = closeH * 60 + closeM;

    while (current + slotMinutes <= end) {
      const hh = String(Math.floor(current / 60)).padStart(2, "0");
      const mm = String(current % 60).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
      current += slotMinutes;
    }
    if (!slots.includes(schedule.closeTime)) {
      slots.push(schedule.closeTime);
    }
    const startTimes = slots.slice(0, -1);
    const endTimes = slots.slice(1);

    const bookedTimes = bookings.map((b) => ({
      startTime: b.startTime,
      endTime: b.endTime,
    }));

    const times = startTimes.filter(
      (slot) =>
        !bookedTimes.some((b) => slot >= b.startTime && slot < b.endTime)
    );

    const court = await prisma.court.findUnique({
      where: { id },
    });

    return NextResponse.json(
      {
        openTime: schedule.openTime,
        closeTime: schedule.closeTime,
        isClosed: schedule.isClosed,
        bookedTimes,
        startTimes,
        endTimes,
        times,
        pricePerHour: court?.pricePerHour || 0,
      },
      {
        status: 200,
        statusText: "Available times fetched successfully",
      }
    );
  } catch (error) {
    console.log("Error fetching availableTime: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
