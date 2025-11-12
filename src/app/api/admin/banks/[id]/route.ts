import { BankFormSchema } from "@/features/admin/banks/forms/bankForm";
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
    return new Response(null, {
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
    await prisma.bankAccount.update({
      where: { id: (await params).id },
      data: {
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        accountHolderName: data.accountHolderName,
      },
    });
    return NextResponse.json(null, {
      status: 200,
      statusText: "Bank account updated successfully",
    });
  } catch (error) {
    console.log("Error updating bank account: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
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
    await prisma.bankAccount.delete({
      where: { id: (await params).id },
    });
    return NextResponse.json(null, {
      status: 200,
      statusText: "Bank account deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting bank account: ", error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
