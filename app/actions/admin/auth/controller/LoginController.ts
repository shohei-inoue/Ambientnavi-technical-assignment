"use server";

import { loginUser } from "../usecase/LoginUseCase";
import { UserRepositoryImpl } from "../repository/UserRepository";
import { TableSessionRepositoryImpl } from "../../../web/tableSession/repository/TableSessionRepository";
import { signJwt } from "@/app/lib/jwt";
import { NextResponse } from "next/server";

const loginUsecase = loginUser(UserRepositoryImpl, TableSessionRepositoryImpl);

export async function loginWithCookie(
  email: string,
  password: string,
  sessionId: string
): Promise<NextResponse> {
  const { user } = await loginUsecase(email, password, sessionId);

  const token = signJwt({ id: user.id, email: user.email });

  const response = NextResponse.json({ message: "ログイン成功", user });

  response.cookies.set("auth_token", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  response.cookies.set("sessionId", sessionId, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
