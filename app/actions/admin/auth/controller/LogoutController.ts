"use server";

import { NextResponse } from "next/server";

export async function logoutWithCookie(): Promise<NextResponse> {
  const response = NextResponse.json({ message: "ログアウト成功" });

  response.cookies.set("auth_token", "", {
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("sessionId", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}