import { prisma } from "@/app/lib/prisma";
import { Menu } from "../domain/Menu";
import path from "path";
import { unlink, writeFile } from "fs/promises";

export interface MenuRepository {
  getMenu(): Promise<Menu[]>;
  getMenuDetail(id: number): Promise<Menu | null>;
  createMenu(data: FormData): Promise<void>;
  updateMenu(data: FormData): Promise<void>;
  deleteMenu(id: number): Promise<void>;
}

export const MenuRepositoryImpl: MenuRepository = {
  async getMenu() {
    const menus = await prisma.menu.findMany({
      include: {
        subCategory: true,
        tags: {
          include: { tag: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return menus.map((menu) => ({
      id: menu.id,
      name: menu.name,
      description: menu.description || "",
      price: menu.price,
      imageUrl: menu.imageUrl || null,
      isAvailable: menu.isAvailable,
      taxIncluded: menu.taxIncluded,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
      subCategory: menu.subCategory,
      tags: menu.tags.map((mt) => ({
        id: mt.tag.id,
        name: mt.tag.name,
        color: mt.tag.color,
        createdAt: mt.tag.createdAt,
        updatedAt: mt.tag.updatedAt,
      })),
    }));
  },

  async getMenuDetail(id) {
    const menu = await prisma.menu.findUnique({
      where: { id },
      include: {
        subCategory: true,
        tags: { include: { tag: true } },
      },
    });

    if (!menu) return null;

    return {
      id: menu.id,
      name: menu.name,
      description: menu.description || "",
      price: menu.price,
      imageUrl: menu.imageUrl || null,
      isAvailable: menu.isAvailable,
      taxIncluded: menu.taxIncluded,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
      subCategory: menu.subCategory,
      tags: menu.tags.map((mt) => ({
        id: mt.tag.id,
        name: mt.tag.name,
        color: mt.tag.color,
        createdAt: mt.tag.createdAt,
        updatedAt: mt.tag.updatedAt,
      })),
    };
  },

  async createMenu(formData) {
    const name = formData.get("name") as string;
    const price = parseInt(formData.get("price") as string);
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;
    const isAvailable = formData.get("isAvailable") === "true";
    const taxIncluded = formData.get("taxIncluded") === "true";
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    const subCategoryId = parseInt(formData.get("subCategoryId") as string);

    // validation
    if (!name || !price || !subCategoryId || Number.isNaN(price)) {
      throw new Error("必須項目が正しく入力されていません");
    }

    if (price < 0) {
      throw new Error("価格は0以上である必要があります");
    }

    if (tags.length > 5) {
      throw new Error("タグは5個までにしてください");
    }

    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      // image validation
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(imageFile.type)) {
        throw new Error("画像はJPEG, PNG, WebP形式に対応しています");
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (imageFile.size > maxSize) {
        throw new Error("画像サイズは2MB以下にしてください");
      }

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
        subCategory: { connect: { id: subCategoryId } },
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
    });
  },

  async updateMenu(formData) {
    const id = parseInt(formData.get("id") as string);
    const name = formData.get("name") as string;
    const price = parseInt(formData.get("price") as string);
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;
    const isAvailable = formData.get("isAvailable") === "true";
    const taxIncluded = formData.get("taxIncluded") === "true";
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    const subCategoryId = parseInt(formData.get("subCategoryId") as string);

    const existing = await prisma.menu.findUnique({ where: { id } });
    let imageUrl = existing?.imageUrl || null;

    // validation
    if (!name || !price || !subCategoryId || Number.isNaN(price)) {
      throw new Error("必須項目が正しく入力されていません");
    }

    if (price < 0) {
      throw new Error("価格は0以上である必要があります");
    }

    if (tags.length > 5) {
      throw new Error("タグは5個までにしてください");
    }

    if (imageFile && imageFile.size > 0) {
      // image validation
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(imageFile.type)) {
        throw new Error("画像はJPEG, PNG, WebP形式に対応しています");
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (imageFile.size > maxSize) {
        throw new Error("画像サイズは2MB以下にしてください");
      }
      if (imageUrl?.startsWith("/uploads/")) {
        await unlink(path.join(process.cwd(), "public", imageUrl)).catch(
          () => {}
        );
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
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
    });
  },

  async deleteMenu(id) {
    const menu = await prisma.menu.findUnique({ where: { id } });
    if (!menu) return;

    if (menu.imageUrl?.startsWith("/uploads/")) {
      await unlink(path.join(process.cwd(), "public", menu.imageUrl)).catch(
        () => {}
      );
    }

    await prisma.menuTag.deleteMany({ where: { menuId: id } });
    await prisma.menu.delete({ where: { id } });
  },
};
