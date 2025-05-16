"use server";

import { prisma } from "../lib/prisma";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;

  // 重複チェック
  const existing = await prisma.category.findFirst({ where: { name } });
  if (existing) {
    throw new Error("同じ名前のカテゴリがすでに存在します");
  }

  await prisma.category.create({
    data: {
      name,
    },
  });
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { menus: true },
      },
    },
  });

  return categories;
}

export async function getCategory(id: number) {
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });

  return category;
}

export async function updateCategory(formData: FormData) {
  const id = parseInt(formData.get("id") as string, 10);
  const name = formData.get("name") as string;

  // 自分以外で同名が存在するかチェック
  const duplicate = await prisma.category.findFirst({
    where: {
      name,
      NOT: { id }, // 自分自身は除外
    },
  });

  if (duplicate) {
    throw new Error("同じ名前のカテゴリがすでに存在します");
  }
  await prisma.category.update({
    where: { id },
    data: { name },
  });
}

export async function deleteCategory(id: number) {
  if (!id) {
    throw new Error("IDが無効です");
  }

  await prisma.category.delete({
    where: { id },
  });
}
