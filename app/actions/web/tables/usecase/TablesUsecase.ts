import { TableRepository } from "../repository/TablesRepository";

export function getTableDetailUsecase(tr: TableRepository) {
  return async (id: number) => {
    return await tr.getTable(id);
  };
}
