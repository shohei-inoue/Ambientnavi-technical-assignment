import { prisma } from "@/app/lib/prisma";
import { Menu } from "../domain/Menu";

export interface MenuRepository {
  getMenuByCategoryId(categoryId: number | null): Promise<Menu[]>;
  getMenuDetail(id: number): Promise<Menu | null>;
}

export const MenuRepositoryImpl: MenuRepository = {
  async getMenuByCategoryId(categoryId) {
    const menus = await prisma.menu.findMany({
      where: categoryId !== null ? { subCategory: { categoryId } } : undefined,
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
        { subCategory: { category: { name: "asc" } } },
        { subCategory: { name: "asc" } },
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
          subCategories: [],
        },
      },
      tags: menu.tags.map((t) => ({
        id: t.tag.id,
        name: t.tag.name,
        color: t.tag.color,
      })),
    }));
  },

  async getMenuDetail(id) {
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
          subCategories: [],
        },
      },
      tags: menu.tags.map((t) => ({
        id: t.tag.id,
        name: t.tag.name,
        color: t.tag.color,
      })),
    };
  },
};
