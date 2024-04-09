import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();
  console.log({ name, email, password });

  try {
    if (!name || name == "") {
      if (name.length <= 5) {
        return NextResponse.json(
          { error: "name are minimum 5 character" },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: "name are required" }, { status: 400 });
    } else if (!email || email == "") {
      return NextResponse.json(
        { error: "email are required" },
        { status: 400 }
      );
    } else if (!password || password == "") {
      return NextResponse.json(
        { error: "password are required" },
        { status: 400 }
      );
    }

    const exist_user = await prisma.user.findFirst({ where: { email } });

    if (exist_user) {
      return NextResponse.json(
        { error: "email are already used" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "user create successfull" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
