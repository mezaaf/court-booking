import { BookingStatus, PaymentStatus } from "@/generated/prisma/enums";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const headers = {
    authorization: req.headers.get("authorization") || "",
    cookie: req.headers.get("cookie") || "",
  };
  const session = await auth.api.getSession({ headers });
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }
  const { id } = await params;
  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "Data pembayaran tidak ditemukan",
      });
    }
    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { status: BookingStatus.CONFIRMED },
    });
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: PaymentStatus.CONFIRMED },
    });
    return NextResponse.json(null, {
      status: 200,
      statusText: "Pembayaran berhasil dikonfirmasi",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      console.log("Error updating payment status: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
