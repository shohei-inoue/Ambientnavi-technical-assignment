"use server";

import { AdminCategoryData } from "@/app/types/types";
import { prisma } from "../../lib/prisma";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const subCategoryNames = formData.getAll("subCategories") as string[];

  // 重複チェック
  const existing = await prisma.category.findFirst({ where: { name } });
  if (existing) {
    throw new Error("同じ名前のカテゴリがすでに存在します");
  }

  await prisma.category.create({
    data: {
      name,
      subCategories: {
        create: subCategoryNames
          .filter((name) => name.trim() !== "")
          .map((name) => ({ name })),
      },
    },
  });
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      subCategories: {
        include: {
          _count: {
            select: { menus: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
}

export async function getCategory(
  id: number
): Promise<AdminCategoryData | null> {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      subCategories: {
        include: {
          _count: { select: { menus: true } },
        },
      },
    },
  });

  if (!category) return null;

  return category;
}

export async function updateCategory(formData: FormData) {
  const id = parseInt(formData.get("id") as string, 10);
  const name = formData.get("name") as string;
  const subCategoryNames = formData.getAll("subCategories") as string[];

  // 重複チェック
  const duplicate = await prisma.category.findFirst({
    where: {
      name,
      NOT: { id },
    },
  });

  if (duplicate) {
    throw new Error("同じ名前のカテゴリがすでに存在します");
  }

  // 既存のサブカテゴリを削除（メニューも削除される前提）
  await prisma.menu.deleteMany({
    where: {
      subCategory: {
        categoryId: id,
      },
    },
  });

  await prisma.subCategory.deleteMany({
    where: {
      categoryId: id,
    },
  });

  // 更新
  await prisma.category.update({
    where: { id },
    data: {
      name,
      subCategories: {
        create: subCategoryNames.map((name) => ({ name })),
      },
    },
  });
}

export async function deleteCategory(id: number) {
  if (!id) {
    throw new Error("IDが無効です");
  }

  // カテゴリに属するサブカテゴリを取得
  const subCategories = await prisma.subCategory.findMany({
    where: { categoryId: id },
    select: { id: true },
  });

  const subCategoryIds = subCategories.map((sc) => sc.id);

  // サブカテゴリに属するメニューを削除
  await prisma.menu.deleteMany({
    where: {
      subCategoryId: {
        in: subCategoryIds,
      },
    },
  });

  // サブカテゴリを削除
  await prisma.subCategory.deleteMany({
    where: { categoryId: id },
  });

  // カテゴリを削除
  await prisma.category.delete({
    where: { id },
  });
}
