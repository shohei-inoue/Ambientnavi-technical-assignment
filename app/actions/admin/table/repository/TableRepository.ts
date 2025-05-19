import { prisma } from "@/app/lib/prisma";

export interface TableRepository {
  getTableByNumber(tableNumber: number): Promise<{ id: number } | null>;
}

export const TableRepositoryImpl: TableRepository = {
  // get table by table number implement
  async getTableByNumber(number: number) {
    return prisma.table.findFirst({ where: { number } });
  },
}