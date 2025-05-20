import {
  handleDeleteCategory,
  handleUpdateCategory,
} from "@/app/actions/admin/categories/controller/CategoriesController";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const formData = await req.formData();
  formData.append("id", context.params.id); // 明示的にformDataへid追加

  try {
    await handleUpdateCategory(formData);
    return NextResponse.json({ message: "カテゴリ更新成功" }, { status: 200 });
  } catch (err: any) {
    console.error("カテゴリ更新失敗:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "不正なIDです" }, { status: 400 });
  }

  try {
    await handleDeleteCategory(id);
    return NextResponse.json({ message: "カテゴリ削除成功" }, { status: 200 });
  } catch (err: any) {
    console.error("カテゴリ削除失敗:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
