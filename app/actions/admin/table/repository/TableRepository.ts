import { prisma } from "@/app/lib/prisma";
import { Table } from "../domain/Table";

export interface TableRepository {
  getTables(): Promise<Table[]>;
  getTable(id: number): Promise<Table | null>;
  getTableByNumber(number: number): Promise<Table | null>;
  updateTable(id: number, number: number, isAvailable: boolean): Promise<Table>;
  createTable(number: number, isAvailable: boolean): Promise<Table>;
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

  // get table by Number implement
  async getTableByNumber(number: number): Promise<Table | null> {
    const result = await prisma.table.findUnique({
      where: { number },
    });

    if (!result) return null;

    return {
      id: result.id,
      number: result.number,
      isAvailable: result.isAvailable,
    };
  },

  // create table implement
  async createTable(number, isAvailable) {
    return await prisma.table.create({
      data: {
        number,
        isAvailable,
      },
    });
  },

  // update table implement
  async updateTable(id, number, isAvailable) {
    return await prisma.table.update({
      where: { id },
      data: {
        number,
        isAvailable,
      },
    });
  },

  // delete table implement
  async deleteTable(id) {
    await prisma.table.delete({ where: { id } });
  },
};
