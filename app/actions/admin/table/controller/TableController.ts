"use server"

import {
  getTablesUsecase,
  createTableUsecase,
  deleteTableUsecase,
  getTableDetailUsecase,
  updateTableUsecase,
} from "@/app/actions/admin/table/usecase/TableUsecase";
import { TableRepositoryImpl } from "@/app/actions/admin/table/repository/TableRepository";

const getTables = getTablesUsecase(TableRepositoryImpl);
const getTable = getTableDetailUsecase(TableRepositoryImpl);
const createTable = createTableUsecase(TableRepositoryImpl);
const updateTable = updateTableUsecase(TableRepositoryImpl);
const deleteTable = deleteTableUsecase(TableRepositoryImpl);

export async function handleGetTables() {
  return await getTables();
}

export async function handleGetTable(id: number) {
  return await getTable(id);
}

export async function handleCreateTable(formData: FormData) {
  const number = Number(formData.get("number"));
  const isAvailable = formData.get("isAvailable") === "true";

  if (!number || isNaN(number)) {
    throw new Error("有効なテーブル番号を入力してください");
  }

  await ensureUniqueTableNumber(number);

  return await createTable(number, isAvailable);
}

export async function handleUpdateTable(formData: FormData) {
  const id = Number(formData.get("id"));
  const number = Number(formData.get("number"));
  const isAvailable = formData.get("isAvailable") === "true";

  if (!id || isNaN(id) || !number || isNaN(number)) {
    throw new Error("有効なIDおよびテーブル番号を入力してください");
  }

  await ensureUniqueTableNumber(number, id);

  return await updateTable(id, number, isAvailable);
}

export async function handleDeleteTable(id: number) {
  return await deleteTable(id);
}

async function ensureUniqueTableNumber(number: number, excludeId?: number) {
  const existing = await TableRepositoryImpl.getTableByNumber(number);
  if (existing && existing.id !== excludeId) {
    throw new Error("このテーブル番号はすでに使用されています");
  }
}
