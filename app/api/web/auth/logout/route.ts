import { logoutWithCookie } from "@/app/actions/admin/auth/controller/LogoutController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return await logoutWithCookie();
  } catch (err: any) {
    console.error("ログアウト失敗:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
