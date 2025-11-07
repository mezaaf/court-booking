import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const courts = await prisma.court.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(courts);
}

export async function POST(req: Request) {
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
    return NextResponse.json(court);
  } catch (error) {
    console.error("Error creating court: ", error);
    return NextResponse.json({ error: "Failed to create court" });
  }
}
