import { handleCreateCategory } from "@/app/actions/admin/categories/controller/CategoriesController";
import { NextRequest, NextResponse } from "next/server";

// POST /api/admin/categories → 新規カテゴリ作成
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  try {
    await handleCreateCategory(formData);
    return NextResponse.json({ message: "カテゴリ作成成功" }, { status: 201 });
  } catch (err: any) {
    console.error("カテゴリ作成失敗:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
