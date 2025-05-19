import { createUser } from "@/app/actions/web/registerActions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const user = await createUser(formData);
    return new Response(JSON.stringify(user), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "ユーザー登録に失敗しました" }),
      { status: 500 }
    );
  }
}
