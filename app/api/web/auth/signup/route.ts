import { NextRequest, NextResponse } from "next/server";
import { signup } from "@/app/actions/admin/auth/controller/SignupController";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const birthdayStr = data.get("birthday") as string;
  const genderStr = data.get("gender") as string;

  if (!name || !email || !password || !birthdayStr || !genderStr) {
    return NextResponse.json(
      {
        error:
          "すべての項目（name, email, password, birthday, gender, tableNumber）が必要です",
      },
      { status: 400 }
    );
  }

  // ユーザー作成 & セッションリンク
  try {
    const user = await signup({
      name,
      email,
      password,
      birthdayStr,
      genderStr,
    });

    return NextResponse.json({ message: "サインアップ成功", user });
  } catch (err: any) {
    console.error("ユーザー作成失敗:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
