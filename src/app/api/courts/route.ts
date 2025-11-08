import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const courts = await prisma.court.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json({
    status: 200,
    message: "Courts fetched successfully",
    data: courts,
  });
}

export async function POST(req: Request) {
  const headers = {
    authorization: req.headers.get("authorization") ?? "",
    cookie: req.headers.get("cookie") ?? "",
  };
  const session = await auth.api.getSession({ headers });

  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({
      status: 403,
      message: "Forbidden",
      data: null,
    });
  }

  const data = await req.json();
  try {
    const court = await prisma.court.create({
      data: {
        name: data.name,
        description: data.description === "" ? null : data.description,
        pricePerHour: Number(data.pricePerHour),
        image: data.image,
        isActive: data.isActive ?? true,
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Court created successfully",
      data: court,
    });
  } catch (error) {
    console.error("Error creating court: ", error);
    return NextResponse.json({
      status: 500,
      message: "Error creating court",
      data: null,
    });
  }
}
