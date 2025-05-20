import { NextRequest, NextResponse } from "next/server";
import {
  handleAddToCart,
  handleGetCart,
  handleDeleteCart,
} from "@/app/actions/web/cart/controller/CartController";
import { getSessionCookie } from "@/app/lib/cookies";

// POST: カートに商品を追加
export async function POST(req: NextRequest) {
  try {
    const { sessionId, menuId, quantity, note } = await req.json();

    if (!sessionId || !menuId || !quantity) {
      return NextResponse.json(
        { error: "必要な情報が不足しています" },
        { status: 400 }
      );
    }

    await handleAddToCart(sessionId, menuId, quantity, note);

    return NextResponse.json(
      { message: "カートに追加しました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("カート追加エラー:", error);
    return NextResponse.json(
      { error: "カート追加に失敗しました" },
      { status: 500 }
    );
  }
}

// GET: セッションに紐づくカートを取得
export async function GET(_req: NextRequest) {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return NextResponse.json(
      { error: "セッションIDが見つかりません" },
      { status: 400 }
    );
  }

  try {
    const cart = await handleGetCart(sessionId);

    if (!cart) {
      return NextResponse.json(
        { error: "カートが存在しません" },
        { status: 404 }
      );
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("カート取得エラー:", error);
    return NextResponse.json(
      { error: "カート取得に失敗しました" },
      { status: 500 }
    );
  }
}

// DELETE: カート削除
export async function DELETE(_req: NextRequest) {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return NextResponse.json(
      { error: "セッションIDが見つかりません" },
      { status: 400 }
    );
  }

  try {
    await handleDeleteCart(sessionId);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("カート削除エラー:", error);
    return NextResponse.json(
      { error: "カート削除に失敗しました" },
      { status: 500 }
    );
  }
}
