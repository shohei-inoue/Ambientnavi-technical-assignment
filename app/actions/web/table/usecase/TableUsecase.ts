import { TableRepository } from "../repository/TableRepository";

export function getTableDetailUsecase(tr: TableRepository) {
  return async (id: number) => {
    return await tr.getTable(id);
  };
}
