"use server";

import { cookies } from "next/headers";

// 認証トークンをCookieに保存
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  await cookieStore.set("auth_token", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

// 認証トークンを削除
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  await cookieStore.delete("auth_token");
}

// セッションIDを保存
export async function setSessionCookie(sessionId: string) {
  const cookieStore = await cookies();
  await cookieStore.set("sessionId", sessionId, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

// セッションIDを取得
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("sessionId")?.value;
}

// セッションIDを削除
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  await cookieStore.delete("sessionId");
}
