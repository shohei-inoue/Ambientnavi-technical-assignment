import { getTableDetailUsecase } from "@/app/actions/admin/table/usecase/TableUsecase";
import { TableRepositoryImpl } from "@/app/actions/admin/table/repository/TableRepository";

const getTable = getTableDetailUsecase(TableRepositoryImpl);

export async function handleGetTableDetail(id: number) {
  return await getTable(id);
}
