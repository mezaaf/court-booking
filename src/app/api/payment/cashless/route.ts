import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { CashlessPaymentPayload } from "@/types/payment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const headers = {
    authorization: req.headers.get("authorization") || "",
    cookie: req.headers.get("cookie") || "",
  };
  const session = await auth.api.getSession({ headers });
  if (!session) {
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
  const data: CashlessPaymentPayload = await req.json();

  try {
    const existingBooking = await prisma.booking.findUnique({
      where: { id: data.bookingId },
    });

    if (!existingBooking) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "Data booking tidak ditemukan.",
      });
    }

    await prisma.payment.create({
      data: {
        bookingId: existingBooking.id,
        amount: existingBooking.totalPrice,
        proofOfPayment: null,
        method: "CASHLESS",
        status: "PENDING",
        note: "Bayar di tempat",
      },
    });
    return NextResponse.json(null, {
      status: 201,
      statusText: "Pembayaran berhasil dibuat dan akan segera dikonfirmasi.",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      console.log("Error creating payment: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
