import { ScheduleFormSchema } from "@/features/admin/schedules/forms/scheduleForm";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const schedule = await prisma.schedule.update({
      where: { id: (await params).id },
      data: {
        courtId: data.courtId,
        dayOfWeek: Number(data.dayOfWeek),
        openTime: data.openTime,
        closeTime: data.closeTime,
        isClosed: data.isClosed,
      },
    });
    return NextResponse.json(schedule, {
      status: 200,
      statusText: "Schedule updated successfully",
    });
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error updating schedule",
    });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const headers = {
    authorization: _.headers.get("authorization") ?? "",
    cookie: _.headers.get("cookie") ?? "",
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
  try {
    await prisma.schedule.delete({
      where: { id: (await params).id },
    });
    return NextResponse.json(null, {
      status: 200,
      statusText: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error deleting schedule",
    });
  }
}
