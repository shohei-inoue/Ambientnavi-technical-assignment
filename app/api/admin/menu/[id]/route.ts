// app/api/admin/menus/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  handleGetMenuDetail,
  handleUpdateMenu,
  handleDeleteMenu,
} from "@/app/actions/admin/menu/controller/MenuController";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "不正なIDです" }, { status: 400 });

  const formData = await req.formData();
  formData.append("id", String(id));

  try {
    await handleUpdateMenu(formData);
    return NextResponse.json({ message: "更新しました" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "不正なIDです" }, { status: 400 });

  try {
    await handleDeleteMenu(id);
    return NextResponse.json({ message: "削除しました" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
