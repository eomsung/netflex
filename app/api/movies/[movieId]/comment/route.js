import { extractUserIdFromRequest } from "../like/route";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(_, context) {
  try {
    const params = await context.params;
    const movieId = Number(params.movieId);
    const movieComment = await prisma.movieComment.findMany({
      where: { movieId },
      include: { user: { select: { id: true } } },
    });
    if (!movieComment) return;

    return NextResponse.json(movieComment);
  } catch (e) {
    console.log(e.message);
    return NextResponse.json("bad");
  }
}

export async function POST(request, context) {
  try {
    const { content } = await request.json();
    const params = await context.params;
    const movieId = Number(params.movieId);
    const userId = await extractUserIdFromRequest(request);

    const movieComment = await prisma.movieComment.create({
      data: {
        movieId,
        userId,
        content,
      },
    });

    return NextResponse.json(movieComment);
  } catch (e) {
    console.log(e.message);
    return NextResponse.json("bad");
  }
}
