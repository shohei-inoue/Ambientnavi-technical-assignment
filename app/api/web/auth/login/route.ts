import { NextRequest, NextResponse } from "next/server";
import { login } from "@/app/actions/admin/auth/controller/LoginController";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const sessionId = req.cookies.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json(
      { error: "セッションが存在しません。QRコードから入り直してください。" },
      { status: 400 }
    );
  }

  try {
    const { user, token } = await login(email, password, sessionId);

    const res = NextResponse.json({ message: "ログイン成功", user });

    // cookieに保存
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    res.cookies.set("sessionId", sessionId, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}