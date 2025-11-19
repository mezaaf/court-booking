import { CreateUserFormSchema } from "@/features/admin/users/forms/userForm";
import { Prisma } from "@/generated/prisma/client";
import { getBetterAuthStatusCode } from "@/lib/betterAuth";
import { auth } from "@/server/auth/auth";
import prisma from "@/server/prisma";
import { APIError } from "better-auth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  const headers = {
    authorization: request.headers.get("authorization") ?? "",
    cookie: request.headers.get("cookie") ?? "",
  };

  const session = await auth.api.getSession({ headers });

  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
      total: 0,
      data: null,
    });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({
      status: 403,
      message: "Forbidden",
      total: 0,
      data: null,
    });
  }

  const offset = (page - 1) * limit;

  try {
    const where: Prisma.UserWhereInput = {
      AND: [
        query
          ? {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };
    const [total, users] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({
        orderBy: {
          name: "asc",
        },
        where,
        skip: offset,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: "Users fetched successfully",
      total,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching users",
      total: 0,
      data: null,
    });
  }
}

export async function POST(req: NextRequest) {
  const headers = {
    authorization: req.headers.get("authorization") ?? "",
    cookie: req.headers.get("cookie") ?? "",
  };
  const session = await auth.api.getSession({ headers });

  if (!session) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  const data: CreateUserFormSchema = await req.json();
  const imagePath = path.join(process.cwd(), "public/images/user.jpg");
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString(
    "base64"
  )}`;

  try {
    await auth.api.createUser({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role === true ? "admin" : "user",
        data: {
          image: base64Image,
        },
      },
    });
    return NextResponse.json(null, {
      status: 201,
      statusText: "Created",
    });
  } catch (error) {
    if (error instanceof APIError) {
      const code = getBetterAuthStatusCode(error.status);
      return NextResponse.json(null, {
        status: code,
        statusText: error.message,
      });
    } else {
      console.log("Error creating user: ", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
