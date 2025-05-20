import { prisma } from "@/app/lib/prisma";
import { Table } from "../domain/Table";

export interface TableRepository {
  createTable(tableNumber: number): Promise<Table>;
  getTableByNumber(number: number): Promise<Table | null>;
}

export const TableRepositoryImpl: TableRepository = {
  // create table implement
  async createTable(tableNumber: number) {
    return prisma.table.create({
      data: {
        number: tableNumber,
        isAvailable: true, // スキーマ変更で追加されたプロパティ
      },
    });
  },

  async getTableByNumber(number: number) {
    return prisma.table.findUnique({ where: { number } });
  },
};