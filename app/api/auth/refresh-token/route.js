import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  //   refreshToken  위변조 된건 아닌지 확인
  try {
    const { refreshToken: prevRefreshToken } = await request.json();
    const { sub } = jwt.verify(prevRefreshToken, process.env.JWT_SECRET_KEY);
    const accessToken = jwt.sign({ sub }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ sub }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });
    const data = { accessToken, refreshToken };
    return NextResponse.json(data);
  } catch (e) {
    console.log(e.message);
    return NextResponse.json("Bad request", { status: 400 });
  }
}
