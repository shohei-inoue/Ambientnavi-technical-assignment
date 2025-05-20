import { NextRequest, NextResponse } from "next/server";
import { login } from "@/app/actions/admin/auth/controller/LoginController";
import { createSession } from "@/app/actions/admin/tableSession/controller/TableSessionController";
import { handleCreateCart } from "@/app/actions/web/cart/controller/CartController";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  let sessionId = req.cookies.get("sessionId")?.value;

  // セッションIDがない場合 -> テーブル番号からセッションを新規作成
  if (!sessionId) {
    const tableNumber = Number(data.get("tableNumber")); // QRで渡されてる想定

    if (!tableNumber) {
      return NextResponse.json(
        { error: "テーブル番号が必要です（sessionIdなしの場合）" },
        { status: 400 }
      );
    }

    try {
      const session = await createSession(tableNumber);
      sessionId = session.sessionId;

      // カートを作成
      try {
        await handleCreateCart(sessionId);
      } catch (error) {
        console.error("カートの作成に失敗しました");
        return NextResponse.json(
          { error: "セッションの作成に失敗しました" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("セッションの作成に失敗しました", error);
      return NextResponse.json(
        { error: "セッションの作成に失敗しました" },
        { status: 500 }
      );
    }
  }

  // ログイン処理
  try {
    const { user, token } = await login(email, password, sessionId);

    const res = NextResponse.json({ message: "ログイン成功", user });

    // cookieを保存
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
