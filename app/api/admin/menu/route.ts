export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  handleCreateMenu,
} from "@/app/actions/admin/menu/controller/MenuController";


export async function POST(req: NextRequest) {
  const formData = await req.formData();
  try {
    await handleCreateMenu(formData);
    return NextResponse.json(
      { message: "メニューを作成しました" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
