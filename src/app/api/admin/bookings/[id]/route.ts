import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { status } = await req.json();

  const headers = {
    authorization: req.headers.get("authorization") || "",
    cookie: req.headers.get("cookie") || "",
  };

  const session = await auth.api.getSession({ headers });

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  try {
    await prisma.booking.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(null, {
      status: 200,
      statusText: "Booking status updated successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      console.log("Error updating booking status: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "An unknown error occurred",
      });
    }
  }
}
