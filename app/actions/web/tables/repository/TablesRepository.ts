import { prisma } from "@/app/lib/prisma";
import { Table } from "../domain/Tables";

export interface TableRepository {
  getTable(id: number): Promise<Table | null>;
}

export const TableRepositoryImpl: TableRepository = {
  // get table implement
  async getTable(id: number) {
    return await prisma.table.findUnique({ where: { id } });
  },
};
