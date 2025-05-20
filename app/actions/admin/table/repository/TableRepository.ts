import { prisma } from "@/app/lib/prisma";
import { Table } from "../domain/Table";

export interface TableRepository {
  createTable(tableNumber: number, guestCount: number): Promise<Table>;
  getTableByNumber(tableNumber: number): Promise<Table | null>;
}

export const TableRepositoryImpl: TableRepository = {
  // create table implement
  async createTable(tableNumber, guestCount) {
    return prisma.table.create({
      data: {
        number: tableNumber,
        guestCount: guestCount,
        isPaid: false,
        checkedInAt: new Date(),
      },
    });
  },

  // get table by table number implement
  async getTableByNumber(number: number) {
    return prisma.table.findFirst({ where: { number } });
  },
};
