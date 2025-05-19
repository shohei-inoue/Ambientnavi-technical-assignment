import {
  createTableSession,
  getLatestTableSession,
} from "@/app/actions/web/sessionActions";
import { prisma } from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { tableNumber, userId } = await req.json();

  if (!tableNumber) {
    return new Response(JSON.stringify({ error: "テーブル番号が必要です" }), {
      status: 400,
    });
  }

  try {
    const table = await prisma.table.findFirst({
      where: { number: tableNumber },
    });

    if (!table) {
      return new Response(JSON.stringify({ error: "テーブルが存在しません" }), {
        status: 404,
      });
    }

    const existing = await getLatestTableSession(table.id);
    const session = existing ?? (await createTableSession(table.id, userId));

    if (!userId) {
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
