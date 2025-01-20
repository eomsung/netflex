import prisma from "@/prisma/client";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const movieId = Number(params.movieId);
    const userId = await extractUserIdFromRequest(request);
    const movieLike = await prisma.movieLike.findFirst({
      where: { movieId, userId },
    });
    const isLiked = !!movieLike;

    return NextResponse.json(isLiked);
  } catch (e) {
    console.log(e.message);
    return NextResponse.json("bad request", { status: 400 });
  }
}

export async function PUT(request, context) {
  try {
    const params = await context.params;
    const movieId = Number(params.movieId);
    const userId = await extractUserIdFromRequest(request);

    await prisma.movieLike.create({ data: { movieId, userId } });

    return NextResponse.json("OK");
  } catch (e) {
    console.log(e.message);
    return NextResponse.json("bad request", { status: 400 });
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const movieId = Number(params.movieId);
    const userId = await extractUserIdFromRequest(request);
    await prisma.movieLike.delete({
      where: { movieId_userId: { movieId, userId } },
    });
    return NextResponse.json("OK");
  } catch (e) {
    console.log(e.message);
    return NextResponse.json("bad request", { status: 400 });
  }
}

// 토큰이 위변조 되었거나, 해당하는 유저가 없으면 에러 발생
export async function extractUserIdFromRequest(request) {
  const authorization = request.headers.get("Authorization") || ""; //->bearer ABCD12
  const accessToken = authorization.split("Bearer ")[1];

  const { sub } = verify(accessToken, process.env.JWT_SECRET_KEY);
  // const user = await prisma.user.findUnique({ where: { email } });
  // if (!user) throw new Error("no user found");

  // const userId = user.id;
  return sub;
}
