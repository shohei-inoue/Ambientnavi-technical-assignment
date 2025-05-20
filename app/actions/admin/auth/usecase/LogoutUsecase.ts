import { clearAuthCookie, clearSessionCookie } from "@/app/lib/cookies";

export async function logoutUser() {
  await clearAuthCookie()
  await clearSessionCookie()
}