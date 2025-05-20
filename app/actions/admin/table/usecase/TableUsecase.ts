import { TableRepository } from "../repository/TableRepository";

export function getTablesUsecase(tr: TableRepository) {
  return async () => {
    return await tr.getTables();
  };
}

export function getTableDetailUsecase(tr: TableRepository) {
  return async (id: number) => {
    return await tr.getTable(id);
  };
}

export function createTableUsecase(tr: TableRepository) {
  return async (number: number) => {
    return await tr.createTable(number);
  };
}

export function deleteTableUsecase(tr: TableRepository) {
  return async (id: number) => {
    return await tr.deleteTable(id);
  };
}
