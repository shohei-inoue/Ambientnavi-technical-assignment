import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/app/actions/web/tableSession/controller/TableSessionController";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const tableNumber = Number(data.get("tableNumber"));
    const guestCount = Number(data.get("guestCount"));

    if (!tableNumber || isNaN(tableNumber)) {
      return NextResponse.json({ error: "無効なテーブル番号です" }, { status: 400 });
    }

    if (!guestCount || isNaN(guestCount) || guestCount <= 0) {
      return NextResponse.json({ error: "無効な人数です" }, { status: 400 });
    }

    const session = await createSession(tableNumber, guestCount);

    return NextResponse.json({ message: "セッション作成成功", session });
  } catch (error: any) {
    console.error("セッション作成エラー:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}