import prisma from "@/prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET(request, context) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    //   이걸로 유저정보 받아서 데이터베이스에 저장 access토큰이랑 refresh 토큰 발행
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      undefined,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          grant_type: "authorization_code",
          client_id: "e5cf10e6bcb87dcdc2709982f65191fa",
          redirect_uri: request.nextUrl.origin + request.nextUrl.pathname,
          code,
        },
      }
    );
    const kakaoAccessToken = response.data.access_token;

    //토큰으로 유저정보 요청
    const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });

    const providerName = "kakao";
    const providerId = String(data.id);

    let user = await prisma.user.findUnique({
      where: { providerName_providerId: { providerName, providerId } },
    });

    if (!user) {
      user = await prisma.user.create({ data: { providerName, providerId } });
    }

    console.log(data);
    return NextResponse.redirect(request.nextUrl.origin);
  } catch {
    return NextResponse.json("OK");
  }
}
