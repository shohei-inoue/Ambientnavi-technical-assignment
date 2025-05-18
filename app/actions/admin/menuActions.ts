"use server";

import path from "path";
import { writeFile, unlink } from "fs/promises";
import { prisma } from "../../lib/prisma";
import { AdminMenuData } from "@/app/types/types";

export async function createMenu(formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;
  const isAvailable = formData.get("isAvailable") === "true";
  const taxIncluded = formData.get("taxIncluded") === "true";
  const tagsString = formData.get("tags") as string;
  const subCategoryId = parseInt(formData.get("subCategoryId") as string, 10);

  const tags = tagsString
    ? tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const existing = await prisma.menu.findFirst({ where: { name } });
  if (existing) throw new Error("同じ名前のメニューがすでに存在します");

  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}_${imageFile.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  await prisma.menu.create({
    data: {
      name,
      price,
      description,
      imageUrl,
      isAvailable,
      taxIncluded,
      subCategory: {
        connect: { id: subCategoryId },
      },
      tags: {
        create: tags.map((tagName) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName },
            },
          },
        })),
      },
    },
  });
}

export async function getMenu() {
  const menus = await prisma.menu.findMany({
    include: {
      subCategory: {
        include: {
          _count: {
            select: { menus: true },
          },
        },
      },
      tags: {
        include: { tag: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedMenus: AdminMenuData[] = menus.map((menu) => ({
    id: menu.id,
    name: menu.name,
    description: menu.description || "",
    price: menu.price,
    imageUrl: menu.imageUrl || "",
    isAvailable: menu.isAvailable,
    taxIncluded: menu.taxIncluded,
    createdAt: menu.createdAt,
    updatedAt: menu.updatedAt,
    subCategory: {
      id: menu.subCategory.id,
      name: menu.subCategory.name,
      _count: {
        menus: menu.subCategory._count.menus,
      },
    },
    tags: menu.tags.map((t) => ({
      id: t.tag.id,
      name: t.tag.name,
      color: t.tag.color,
      createdAt: t.tag.createdAt,
      updatedAt: t.tag.updatedAt,
    })),
  }));

  return formattedMenus;
}

export async function getMenuDetail(id: number) {
  const menu = await prisma.menu.findUnique({
    where: { id },
    include: {
      subCategory: {
        include: {
          _count: {
            select: { menus: true },
          },
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

  const formattedMenu: AdminMenuData = {
    id: menu.id,
    name: menu.name,
    description: menu.description || "",
    price: menu.price,
    imageUrl: menu.imageUrl || "",
    isAvailable: menu.isAvailable,
    taxIncluded: menu.taxIncluded,
    createdAt: menu.createdAt,
    updatedAt: menu.updatedAt,
    subCategory: {
      id: menu.subCategory.id,
      name: menu.subCategory.name,
      _count: {
        menus: menu.subCategory._count.menus,
      },
    },
    tags: menu.tags.map((t) => ({
      id: t.tag.id,
      name: t.tag.name,
      color: t.tag.color,
      createdAt: t.tag.createdAt,
      updatedAt: t.tag.updatedAt,
    })),
  };

  return formattedMenu;
}

export async function updateMenu(formData: FormData) {
  const id = parseInt(formData.get("id") as string, 10);
  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const description = formData.get("description") as string;
  const tagsString = formData.get("tags") as string;
  const imageFile = formData.get("image") as File;
  const isAvailable = formData.get("isAvailable") === "true";
  const taxIncluded = formData.get("taxIncluded") === "true";
  const subCategoryId = parseInt(formData.get("subCategoryId") as string, 10);

  const tags = tagsString
    ? tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const duplicate = await prisma.menu.findFirst({
    where: { name, NOT: { id } },
  });
  if (duplicate) throw new Error("同じ名前のメニューがすでに存在します");

  const existing = await prisma.menu.findUnique({ where: { id } });
  let imageUrl = existing?.imageUrl ?? null;

  if (imageFile && imageFile.size > 0) {
    if (existing?.imageUrl?.startsWith("/uploads/")) {
      const oldPath = path.join(process.cwd(), "public", existing.imageUrl);
      try {
        await unlink(oldPath);
      } catch (err) {
        console.warn("既存画像の削除に失敗:", err);
      }
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}_${imageFile.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  await prisma.menu.update({
    where: { id },
    data: {
      name,
      price,
      description,
      imageUrl,
      isAvailable,
      taxIncluded,
      subCategory: { connect: { id: subCategoryId } },
      tags: {
        deleteMany: {},
        create: tags.map((tagName) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName },
            },
          },
        })),
      },
    },
  });
}

export async function deleteMenu(id: number) {
  const menu = await prisma.menu.findUnique({ where: { id } });
  if (!menu) throw new Error("該当するメニューが存在しません");

  if (menu.imageUrl?.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", menu.imageUrl);
    try {
      await unlink(filePath);
    } catch (error) {
      console.warn("画像ファイルの削除に失敗:", error);
    }
  }

  await prisma.menuTag.deleteMany({ where: { menuId: id } });
  await prisma.menu.delete({ where: { id } });
}
