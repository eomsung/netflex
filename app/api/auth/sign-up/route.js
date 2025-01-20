import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { USER_SALT_ROUNDS } from "@/config";

export async function POST(request) {
  const { email, password } = (await request.json()) || {};

  if (!email || !password)
    return NextResponse.json("invaild input", { status: 400 });

  const existingUser = await prisma.user.findUnique({
    where: {
      providerName_providerId: { providerName: "local", providerId: email },
    },
  });
  if (existingUser)
    return NextResponse.json("Already used email", { status: 400 });

  // 이미 동일한 이메일로 가입한 계정이 있는지 확인

  const encryptedPassword = await bcrypt.hash(password, USER_SALT_ROUNDS);

  const data = { providerName: "local", providerId: email, encryptedPassword };
  await prisma.user.create({ data: data });

  // console.log(uesr);

  return NextResponse.json("OK");
}
