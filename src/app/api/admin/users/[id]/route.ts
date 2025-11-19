import { getBetterAuthStatusCode } from "@/lib/betterAuth";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { APIError } from "better-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
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
  const { id } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return NextResponse.json(user, {
      status: 200,
      statusText: "User fetched successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: error.message,
      });
    } else {
      console.log("Error fetching user: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
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
    await auth.api.removeUser({
      body: { userId: (await params).id },
      headers,
    });
    return NextResponse.json(null, {
      status: 200,
      statusText: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof APIError) {
      const code = getBetterAuthStatusCode(error.status);
      return NextResponse.json(null, {
        status: code,
        statusText: error.message,
      });
    } else {
      console.log("Error deleting user: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
