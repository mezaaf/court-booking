import { BankFormSchema } from "@/features/admin/banks/forms/bankForm";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  const offset = (page - 1) * limit;
  try {
    const [total, banks] = await Promise.all([
      prisma.bankAccount.count(),
      prisma.bankAccount.findMany({
        where: query
          ? {
              OR: [
                { bankName: { contains: query, mode: "insensitive" } },
                { accountNumber: { contains: query, mode: "insensitive" } },
                { accountHolderName: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        orderBy: {
          bankName: "asc",
        },
        skip: offset,
        take: limit,
      }),
    ]);
    return NextResponse.json(
      { total, banks },
      {
        status: 200,
        statusText: "Banks fetched successfully",
      }
    );
  } catch (error) {
    console.log("Error fetching banks: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
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
  const data: BankFormSchema = await req.json();
  try {
    await prisma.bankAccount.create({
      data: {
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        accountHolderName: data.accountHolderName,
      },
    });
    return NextResponse.json(null, {
      status: 201,
      statusText: "Bank account created successfully",
    });
  } catch (error) {
    console.log("Error creating bank account: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
