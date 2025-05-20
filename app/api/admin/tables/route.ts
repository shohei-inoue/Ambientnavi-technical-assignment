import { NextRequest, NextResponse } from "next/server";
import {
  handleCreateTable,
} from "@/app/actions/admin/table/controller/TableController";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const number = Number(data.get("number"));

  if (!number || isNaN(number)) {
    return NextResponse.json(
      { error: "テーブル番号が無効です" },
      { status: 400 }
    );
  }

  try {
    const table = await handleCreateTable(data);
    return NextResponse.json({ message: "テーブル作成成功", table });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
