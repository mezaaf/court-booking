import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const banks = await prisma.bankAccount.findMany();
    return NextResponse.json(
      { banks },
      {
        status: 200,
        statusText: "Banks fetched successfully",
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      console.log("Error fetching banks: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "An unknown error occurred",
      });
    }
  }
}
