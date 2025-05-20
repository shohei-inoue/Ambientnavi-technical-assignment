import { NextRequest, NextResponse } from "next/server";
import { registerTable } from "@/app/actions/admin/table/controller/TableController";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const tableNumber = Number(data.get("tableNumber"));
  const guestCount = Number(data.get("guestCount"));
  console.log(guestCount);

  if (!tableNumber || isNaN(tableNumber)) {
    return NextResponse.json(
      { error: "テーブル番号が無効です" },
      { status: 400 }
    );
  }

  if (!guestCount || isNaN(guestCount) || guestCount <= 0) {
    return NextResponse.json(
      { error: "人数が無効です（1人以上）" },
      { status: 400 }
    );
  }

  try {
    const table = await registerTable(tableNumber, guestCount);
    return NextResponse.json({ message: "テーブルを登録しました", table });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
