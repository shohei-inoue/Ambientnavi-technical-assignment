import { NextRequest, NextResponse } from "next/server";
import {
  handleDeleteTable,
  handleUpdateTable,
} from "@/app/actions/admin/table/controller/TableController";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const data = await req.formData();

  const number = Number(data.get("number"));

  if (!id || !number || isNaN(id) || isNaN(number)) {
    return NextResponse.json({ error: "不正なデータです" }, { status: 400 });
  }

  try {
    const table = await handleUpdateTable(data);
    return NextResponse.json({ message: "更新成功", table });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  if (!id || isNaN(id)) {
    return NextResponse.json({ error: "不正なIDです" }, { status: 400 });
  }

  try {
    await handleDeleteTable(id);
    return NextResponse.json({ message: "削除成功" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
