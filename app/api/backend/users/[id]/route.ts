import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma";
import { findUser } from "@/helpers/findUser";
import { error } from "console";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const deleteUser = await prisma.user.delete({ where: { id: id } });

    return NextResponse.json(deleteUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const { name, email }: { name: string; email: string } = await req.json();

    const user = await findUser(id);

    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: "user are not found!" },
        { status: 400 }
      );
    }

    const updateUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: name || undefined,
        email: email || undefined,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        name: true,
        account: {
          select: {
            provider: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "user not found!" }, { status: 400 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
