import { ScheduleFormSchema } from "@/features/admin/schedules/forms/scheduleForm";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  const offset = (page - 1) * limit;

  try {
    const [total, schedules] = await Promise.all([
      prisma.schedule.count(),
      prisma.schedule.findMany({
        orderBy: {
          dayOfWeek: "asc",
        },
        skip: offset,
        take: limit,
        include: {
          court: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      }),
    ]);
    return NextResponse.json(
      {
        schedules,
        total,
      },
      {
        status: 200,
        statusText: "Schedules fetched successfully",
      }
    );
  } catch (error) {
    console.error("Error fetching schedules: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error fetching schedules",
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
  const data: ScheduleFormSchema = await req.json();
  try {
    const existingSchedule = await prisma.schedule.findFirst({
      where: {
        courtId: data.courtId,
        dayOfWeek: Number(data.dayOfWeek),
      },
    });
    if (existingSchedule) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "Schedule already exists",
      });
    }
    const schedule = await prisma.schedule.create({
      data: {
        courtId: data.courtId,
        dayOfWeek: Number(data.dayOfWeek),
        openTime: data.openTime,
        closeTime: data.closeTime,
        isClosed: data.isClosed,
      },
    });
    return NextResponse.json(schedule, {
      status: 201,
      statusText: "Schedule created successfully",
    });
  } catch (error) {
    console.error("Error creating schedule: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error creating schedule",
    });
  }
}
