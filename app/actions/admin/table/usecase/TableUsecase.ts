import { TableRepository } from "../repository/TableRepository";

export function createTable(tr: TableRepository) {
  return async (tableNumber: number, guestCount: number) => {
    const existing = await tr.getTableByNumber(tableNumber);
    if (existing) throw new Error("すでに同じテーブル番号が存在します");

    return await tr.createTable(tableNumber, guestCount);
  };
}