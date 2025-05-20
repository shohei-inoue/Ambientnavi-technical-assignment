import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { hasLoggedInUserInSession } from "@/app/actions/web/userSession/controller/UserSessionController";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function requireUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!token || !sessionId) {
    redirect("/auth/login");
  }

  try {
    verify(token, SECRET_KEY);
  } catch {
    redirect("/auth/login");
  }

  const hasLoggedIn = await hasLoggedInUserInSession(sessionId);
  if (!hasLoggedIn) {
    redirect("/auth/login");
  }

  return sessionId;
}