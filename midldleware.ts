import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/auth/login", "/auth/register", "/api"]; // 認証不要なパス

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const isAuth = !!token;
  const isPublicPath = PUBLIC_PATHS.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // 認証が必要なページかつ未ログイン → リダイレクト
  if (!isAuth && !isPublicPath) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname); // 復帰用リダイレクト付き
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 静的リソースと Next.js 内部リソースは除外
    "/((?!_next/static|_next/image|favicon.ico|images|assets|api/public).*)",
  ],
};