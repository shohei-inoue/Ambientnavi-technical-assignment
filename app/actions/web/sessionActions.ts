"use server";

import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function createTableSession(tableId: number, userId?: number) {
  const sessionId = uuidv4();

  const session = await prisma.tableSession.create({
    data: {
      tableId,
      userId: userId ?? null,
      sessionId,
    },
  });

  // カートも同時作成
  await prisma.cart.create({
    data: {
      tableSessionId: session.id,
    },
  });

  return session;
}

export async function getLatestTableSession(tableId: number) {
  return await prisma.tableSession.findFirst({
    where: {
      tableId,
      table: {
        isPaid: false,
        checkedOutAt: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createOrGetTableSession(
  tableNumber: number,
  userId?: number
) {
  const table = await prisma.table.findFirst({
    where: { number: tableNumber },
  });

  if (!table) throw new Error("テーブルが存在しません");

  const existing = await getLatestTableSession(table.id);
  if (existing) return existing;

  return await createTableSession(table.id, userId);
}

export async function linkUserToTableSession(userId: number) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    throw new Error("セッションIDが見つかりません");
  }

  const session = await prisma.tableSession.findUnique({
    where: { sessionId },
  });

  if (!session) {
    throw new Error("有効なテーブルセッションが存在しません");
  }

  if (!session.userId) {
    await prisma.tableSession.update({
      where: { sessionId },
      data: { userId },
    });
  }

  return session;
}
