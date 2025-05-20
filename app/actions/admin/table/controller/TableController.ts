import { TableRepositoryImpl } from "../repository/TableRepository";
import { createTable } from "../usecase/TableUsecase";

const createTableUsecase = createTable(TableRepositoryImpl);

export async function registerTable(tableNumber: number, guestCount: number) {
  return await createTableUsecase(tableNumber, guestCount);
}