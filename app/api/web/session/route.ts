import { createSession } from "@/app/actions/admin/tableSession/controller/TableSessionController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { tableNumber, userId } = await req.json();

    if (!tableNumber) {
      return NextResponse.json(
        { error: "テーブル番号が必要です" },
        { status: 400 }
      );
    }

    const session = await createSession(tableNumber, userId);
    if (!userId) {
      return NextResponse.json({ redirect: "/auth/login" }, { status: 200 });
    }

    return NextResponse.json(session, { status: 201 });
  } catch (error: any) {
    console.error("セッション作成エラー:", error);
    return NextResponse.json(
      { error: "セッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}
