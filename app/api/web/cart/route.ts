import {
  addCart,
  createCart,
  addToSessionCart,
  deleteCartBySessionId,
  getCartBySessionId,
} from "@/app/actions/web/cartAction";
import { getSessionCookie } from "@/app/lib/cookies";
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

export async function GET(_: NextRequest) {
  const sessionIdStr = await getSessionCookie();
  const sessionId = sessionIdStr ? parseInt(sessionIdStr, 10) : NaN;

  if (isNaN(sessionId)) {
    return new Response(JSON.stringify({ error: "無効なセッションID" }), {
      status: 400,
    });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { tableSessionId: sessionId },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
        tableSession: {
          include: {
            table: true,
          },
        },
      },
    });

    if (!cart) {
      return new Response(JSON.stringify({ error: "カートが存在しません" }), {
        status: 404,
      });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.menu.price * item.quantity,
      0
    );

    return new Response(
      JSON.stringify({
        cart,
        totalAmount,
        guestCount: cart.tableSession.table.guestCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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
