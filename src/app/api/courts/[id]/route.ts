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
    return NextResponse.json({ error: "Court not found" }, { status: 404 });
  return NextResponse.json(court);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const data = await req.json();
  const court = await prisma.court.update({
    where: { id: (await params).id },
    data,
  });
  return NextResponse.json(court);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await prisma.court.delete({
    where: { id: (await params).id },
  });
  return NextResponse.json({ message: "Court deleted" });
}
