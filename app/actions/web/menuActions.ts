"use server";

import { prisma } from "@/app/lib/prisma";

export async function getMenuByCategory(categoryName: string) {
  const menus = await prisma.menu.findMany({
    where: {
      categories: {
        some: {
          category: {
            name: categoryName,
          },
        },
      },
    },
    include: {
      categories: {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return menus.map((menu) => ({
    id: menu.id,
    name: menu.name,
    description: menu.description || "",
    price: menu.price,
    imageUrl: menu.imageUrl || "",
    isAvailable: menu.isAvailable,
    taxIncluded: menu.taxIncluded,
    categories: menu.categories.map((c) => c.category),
    tags: menu.tags.map((t) => t.tag),
  }));
}
