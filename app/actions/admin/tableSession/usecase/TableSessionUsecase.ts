import { TableSessionRepository } from "../repository/TableSessionRepository";
import { TableRepository } from "../../table/repository/TableRepository";

// テーブルセッションを作成
export function createTableSession(
  tsr: TableSessionRepository,
  tr: TableRepository
) {
  return async (tableNumber: number, guestCount: number) => {
    const table = await tr.getTableByNumber(tableNumber);
    if (!table) throw new Error("テーブルが存在しません");

    const existing = await tsr.getLatestTableSession(table.id);
    if (existing) throw new Error("既に有効なセッションがあります");

    return await tsr.createTableSession(table.id, guestCount);
  };
}

// テーブル番号から最新セッションを取得
export function getTableSession(
  tsr: TableSessionRepository,
  tr: TableRepository
) {
  return async (tableNumber: number) => {
    const table = await tr.getTableByNumber(tableNumber);
    if (!table) throw new Error("テーブルが存在しません");

    return await tsr.getLatestTableSession(table.id);
  };
}

// セッションIDでセッション取得 + ユーザー紐付け
export function getLinkUserToTableSession(tsr: TableSessionRepository) {
  return async (sessionId: string, userId: number) => {
    const session = await tsr.getTableSessionBySessionId(sessionId);
    if (!session) throw new Error("有効なセッションが存在しません");

    await tsr.linkUserToTableSession(sessionId, userId);
    return session;
  };
}