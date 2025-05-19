import {
  addToSessionCart,
  deleteCartBySessionId,
  getCartBySessionId,
} from "@/app/actions/web/cartAction";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const sessionId = parseInt(params.sessionId, 10);
  const { menuId, quantity, note } = await req.json();

  if (!sessionId || !menuId || quantity <= 0) {
    return new Response(JSON.stringify({ error: "無効なリクエスト" }), {
      status: 400,
    });
  }

  try {
    const item = await addToSessionCart(sessionId, menuId, quantity, note);
    return new Response(JSON.stringify(item), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("カート追加エラー:", error);
    return new Response(JSON.stringify({ error: "カート追加に失敗しました" }), {
      status: 500,
    });
  }
}

export async function GET(
  _: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const sessionId = parseInt(params.sessionId, 10);
  if (isNaN(sessionId)) {
    return new Response(JSON.stringify({ error: "無効なセッションID" }), {
      status: 400,
    });
  }

  try {
    const cart = await getCartBySessionId(sessionId);
    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("カート取得エラー:", error);
    return new Response(
      JSON.stringify({ error: "カートの取得に失敗しました" }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const sessionId = parseInt(params.sessionId, 10);
  if (isNaN(sessionId)) {
    return new Response(JSON.stringify({ error: "無効なセッションID" }), {
      status: 400,
    });
  }

  try {
    await deleteCartBySessionId(sessionId);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("カート削除エラー:", error);
    return new Response(
      JSON.stringify({ error: "カートの削除に失敗しました" }),
      {
        status: 500,
      }
    );
  }
}
