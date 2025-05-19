import { addCart, createCart } from "@/app/actions/web/cartAction";
import { prisma } from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { tableSessionId, menuId, quantity, note } = data;

    if (!tableSessionId || !menuId || !quantity) {
      return new Response(
        JSON.stringify({ error: "必要な情報が不足しています" }),
        { status: 400 }
      );
    }

    // カートの存在確認
    let cart = await prisma.cart.findUnique({
      where: { tableSessionId: Number(tableSessionId) },
    });

    if (!cart) {
      cart = await createCart(Number(tableSessionId));
    }

    await addCart(cart.id, Number(menuId), Number(quantity), note);

    return new Response(JSON.stringify({ message: "カートに追加しました" }), {
      status: 200,
    });
  } catch (error) {
    console.error("カート追加エラー:", error);
    return new Response(JSON.stringify({ error: "カート追加に失敗しました" }), {
      status: 500,
    });
  }
}
