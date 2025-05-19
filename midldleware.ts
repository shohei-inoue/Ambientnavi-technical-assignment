import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/api"]; // 認証不要なパス

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuth = !!token;
  const isPublicPath = PUBLIC_PATHS.some((path) => req.nextUrl.pathname.startsWith(path));

  if (!isAuth && !isPublicPath) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
