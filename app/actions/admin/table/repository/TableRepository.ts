import { prisma } from "@/app/lib/prisma";
import { Table } from "../domain/Table";

export interface TableRepository {
  getTables(): Promise<Table[]>;
  getTable(id: number): Promise<Table | null>;
  createTable(number: number): Promise<Table>;
  deleteTable(id: number): Promise<void>;
}

export const TableRepositoryImpl: TableRepository = {
  // get tables implement
  async getTables() {
    return await prisma.table.findMany({
      orderBy: { number: "asc" },
    });
  },

  // get table implement
  async getTable(id: number) {
    return await prisma.table.findUnique({ where: { id } });
  },

  // create table implement
  async createTable(number) {
    return await prisma.table.create({
      data: {
        number,
        isAvailable: true,
      },
    });
  },

  // delete table implement
  async deleteTable(id) {
    await prisma.table.delete({ where: { id } });
  },
};
