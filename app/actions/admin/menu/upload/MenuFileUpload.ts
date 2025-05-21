import path from "path";
import { writeFile, unlink } from "fs/promises";

export async function saveFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);
  await writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}

export async function deleteFile(imageUrl: string) {
  if (imageUrl?.startsWith("/uploads/")) {
    const fullPath = path.join(process.cwd(), "public", imageUrl);
    try {
      await unlink(fullPath);
    } catch (err) {
      console.warn("画像削除失敗:", err);
    }
  }
}
