import { prisma } from "@/app/lib/prisma";
import { TableSession } from "../domain/TableSession";

export interface TableSessionRepository {
  createTableSession(
    tableId: number,
    guestCount: number
  ): Promise<TableSession>;
  getLatestTableSession(tableId: number): Promise<TableSession | null>;
  getTableSessionBySessionId(sessionId: string): Promise<TableSession | null>;
  linkUserToTableSession(sessionId: string, userId: number): Promise<void>;
}

export const TableSessionRepositoryImpl: TableSessionRepository = {
  // create session implement
  async createTableSession(tableId: number, guestCount: number) {
    const sessionId = crypto.randomUUID();

    const session = await prisma.tableSession.create({
      data: {
        tableId,
        sessionId,
        guestCount,
        checkedInAt: new Date(), // 新設カラムに合わせて追加
      },
    });

    await prisma.cart.create({
      data: { tableSessionId: session.id },
    });

    return session;
  },

  // get latest session implement
  async getLatestTableSession(tableId: number) {
    return prisma.tableSession.findFirst({
      where: {
        tableId,
        checkedOutAt: null, // セッションが終了していないかどうか
      },
      orderBy: { checkedInAt: "desc" }, // createdAt → checkedInAt に変更
    });
  },

  // get session by session id implement
  async getTableSessionBySessionId(sessionId: string) {
    return prisma.tableSession.findUnique({ where: { sessionId } });
  },

  // link user to session implement
  async linkUserToTableSession(sessionId: string, userId: number) {
    const session = await prisma.tableSession.findUnique({
      where: { sessionId },
    });

    if (!session) throw new Error("セッションが存在しません");

    // すでにリンクされているかをチェック（重複挿入防止）
    const existing = await prisma.userSession.findFirst({
      where: {
        userId,
        tableSessionId: session.id,
      },
    });

    if (!existing) {
      await prisma.userSession.create({
        data: {
          userId,
          tableSessionId: session.id,
        },
      });
    }
  },
};
