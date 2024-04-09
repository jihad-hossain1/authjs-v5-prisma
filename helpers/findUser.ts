import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function findUser(userId: string) {
  try {
    const findUser = await prisma.user.findFirst({ where: { id: userId } });

    if (!findUser) {
      return NextResponse.json(
        { error: "user are not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(findUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
