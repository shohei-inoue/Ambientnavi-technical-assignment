"use server";

import { prisma } from "@/app/lib/prisma";
import { MenuData } from "@/app/types/types";

export async function getMenuByCategoryId(
  categoryId: number | null
): Promise<MenuData[]> {
  const menus = await prisma.menu.findMany({
    where:
      categoryId !== null
        ? {
            subCategory: {
              categoryId: categoryId,
            },
          }
        : undefined,
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: [
      {
        subCategory: {
          category: {
            name: "asc",
          },
        },
      },
      {
        subCategory: {
          name: "asc",
        },
      },
    ],
  });

  return menus.map((menu) => ({
    id: menu.id,
    name: menu.name,
    description: menu.description || "",
    price: menu.price,
    imageUrl: menu.imageUrl || "",
    isAvailable: menu.isAvailable,
    taxIncluded: menu.taxIncluded,
    subCategory: {
      id: menu.subCategory.id,
      name: menu.subCategory.name,
      category: {
        id: menu.subCategory.category.id,
        name: menu.subCategory.category.name,
        subCategories: [], // 型に合わせて空配列で対応
      },
    },
    tags: menu.tags.map((t) => ({
      id: t.tag.id,
      name: t.tag.name,
      color: t.tag.color,
    })),
  }));
}

export async function getMenuDetail(id: number): Promise<MenuData | null> {
  const menu = await prisma.menu.findUnique({
    where: { id },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!menu) return null;

  return {
    id: menu.id,
    name: menu.name,
    description: menu.description || "",
    price: menu.price,
    imageUrl: menu.imageUrl || "",
    isAvailable: menu.isAvailable,
    taxIncluded: menu.taxIncluded,
    subCategory: {
      id: menu.subCategory.id,
      name: menu.subCategory.name,
      category: {
        id: menu.subCategory.category.id,
        name: menu.subCategory.category.name,
        subCategories: [], // 再帰防止
      },
    },
    tags: menu.tags.map((t) => ({
      id: t.tag.id,
      name: t.tag.name,
      color: t.tag.color,
    })),
  };
}
