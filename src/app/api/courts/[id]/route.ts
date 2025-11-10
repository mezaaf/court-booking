import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const court = await prisma.court.findUnique({
    where: { id: (await params).id },
  });
  if (!court)
    return NextResponse.json(null, {
      status: 404,
      statusText: "Court not found",
    });
  return NextResponse.json(court, {
    status: 200,
    statusText: "Court fetched successfully",
  });
}

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

  try {
    const data = await req.json();
    await prisma.court.update({
      where: { id: (await params).id },
      data: {
        name: data.name,
        description: data.description === "" ? null : data.description,
        pricePerHour: Number(data.pricePerHour),
        image: data.image,
        isActive: data.isActive ?? true,
      },
    });
    return NextResponse.json(null, {
      status: 200,
      statusText: "Court updated successfully",
    });
  } catch (error) {
    console.error("Error updating court:", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error updating court",
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
    await prisma.court.delete({
      where: { id: (await params).id },
    });
    return NextResponse.json(null, {
      status: 200,
      statusText: "Court deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting court:", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Error deleting court",
    });
  }
}
