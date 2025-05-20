import {
  getTablesUsecase,
  createTableUsecase,
  deleteTableUsecase,
  getTableDetailUsecase,
} from "@/app/actions/admin/table/usecase/TableUsecase";
import { TableRepositoryImpl } from "@/app/actions/admin/table/repository/TableRepository";

const getTables = getTablesUsecase(TableRepositoryImpl);
const getTable = getTableDetailUsecase(TableRepositoryImpl);
const createTable = createTableUsecase(TableRepositoryImpl);
const deleteTable = deleteTableUsecase(TableRepositoryImpl);

export async function handleFetchTables() {
  return await getTables();
}

export async function handleGetTableDetail(id: number) {
  return await getTable(id);
}

export async function handleCreateTable(number: number) {
  return await createTable(number);
}

export async function handleDeleteTable(id: number) {
  return await deleteTable(id);
}
