"use server";

import { signupUser } from "../usecase/SignupUseCase";
import { UserRepositoryImpl } from "../repository/UserRepository";
import {
  getSessionCookie,
  setAuthCookie,
  setSessionCookie,
} from "@/app/lib/cookies";
import { signJwt } from "@/app/lib/jwt";
import { getLinkUserToSession } from "@/app/actions/web/tableSession/controller/TableSessionController";
import { NextResponse } from "next/server";

const signupUserUsecase = signupUser(UserRepositoryImpl);

export async function signup({
  name,
  email,
  password,
  birthdayStr,
  genderStr,
}: {
  name: string;
  email: string;
  password: string;
  birthdayStr: string;
  genderStr: string;
}) {
  const user = await signupUserUsecase({
    name,
    email,
    password,
    birthdayStr,
    genderStr,
  });

  const sessionId = await getSessionCookie();
  if (!sessionId) {
    throw new Error(
      "セッションが見つかりません。QRコードから再入場してください"
    );
  }

  await getLinkUserToSession(user.id);

  const token = signJwt({ id: user.id, email: user.email });

  const res = NextResponse.json({ message: "サインアップ成功", user });

  await setAuthCookie(token);
  await setSessionCookie(sessionId);

  return res;
}
