import { createOrGetTableSession } from "@/app/actions/web/sessionActions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { tableNumber, userId } = await req.json();

  if (!tableNumber) {
    return new Response(
      JSON.stringify({ error: "テーブル番号が必要です" }),
      { status: 400 }
    );
  }

  try {
    const session = await createOrGetTableSession(tableNumber, userId);

    if (!userId) {
      // ユーザー未ログインならログイン画面へリダイレクト（フロントでハンドリング）
      return new Response(JSON.stringify({ redirect: "/auth/login" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(session), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("セッション作成エラー:", error);
    return new Response(
      JSON.stringify({ error: "セッションの作成に失敗しました" }),
      { status: 500 }
    );
  }
}
