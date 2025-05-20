import { NextRequest, NextResponse } from "next/server";
import {
  handleDeleteTable,
  handleUpdateTable,
} from "@/app/actions/admin/table/controller/TableController";

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = parseInt(params.id, 10);
//   if (isNaN(id)) {
//     return NextResponse.json({ error: "Invalid table ID" }, { status: 400 });
//   }

//   try {
//     const table = await handleGetTable(id);
//     return NextResponse.json({ table }, { status: 200 });
//   } catch (err: any) {
//     console.error("GET /api/admin/tables/[id] エラー:", err);
//     return NextResponse.json(
//       { error: err.message || "テーブルの取得に失敗しました" },
//       { status: 500 }
//     );
//   }
// }

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
