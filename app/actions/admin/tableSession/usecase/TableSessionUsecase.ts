import { SessionRepository } from "../repository/TableSessionRepository";
import { TableRepository } from "../../table/repository/TableRepository";

// create table session
export function createTableSession(sr: SessionRepository, tr: TableRepository) {
  return async (tableNumber: number) => {
    const table = await tr.getTableByNumber(tableNumber);
    if (!table) throw new Error("テーブルが存在しません");

    const existing = await sr.getLatestTableSession(table.id);
    if (existing) throw new Error("既に有効なセッションがあります");

    return await sr.createTableSession(table.id);
  };
}

// get table session
export function getTableSession(sr: SessionRepository, tr: TableRepository) {
  return async (tableNumber: number) => {
    const table = await tr.getTableByNumber(tableNumber);
    if (!table) throw new Error("テーブルが存在しません");

    return await sr.getLatestTableSession(table.id);
  };
}

// get session and link user to session
export function getLinkUserToTableSession(sr: SessionRepository) {
  return async (sessionId: string, userId: number) => {
    const session = await sr.getTableSessionBySessionId(sessionId);
    if (!session) throw new Error("有効なセッションが存在しません");

    await sr.linkUserToTableSession(sessionId, userId);
    return session;
  };
}
