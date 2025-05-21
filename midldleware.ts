import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/app/lib/jwt";
import type { JwtPayload } from "@/app/lib/jwt";

const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/register",
  "/admin/auth/login",
  "/admin/auth/register",
  "/api", // API ルートは基本公開（必要に応じて制限）
];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  if (isPublicPath) return NextResponse.next();

  if (!token) {
    const redirectTo = pathname.startsWith("/admin")
      ? "/admin/auth/login"
      : "/auth/login";

    const loginUrl = new URL(redirectTo, req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const user = verifyJwt<JwtPayload>(token);
  if (!user) {
    const fallbackUrl = pathname.startsWith("/admin")
      ? "/admin/auth/login"
      : "/auth/login";
    return NextResponse.redirect(new URL(fallbackUrl, req.url));
  }

  if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|assets|api/public).*)",
  ],
};