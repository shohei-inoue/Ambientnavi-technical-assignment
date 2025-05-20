import { NextRequest } from "next/server";
import { loginWithCookie } from "@/app/actions/admin/auth/controller/LoginController";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const sessionId = (await cookies()).get("sessionId")?.value;

  if (!sessionId) {
    return Response.json(
      { error: "セッションが存在しません。QRコードから入り直してください。" },
      { status: 400 }
    );
  }

  try {
    return await loginWithCookie(email, password, sessionId);
  } catch (err: any) {
    console.error("ログイン失敗:", err);
    return Response.json({ error: err.message }, { status: 401 });
  }
}
