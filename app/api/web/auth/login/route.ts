import { prisma } from "@/app/lib/prisma";
import { compare } from "bcryptjs";
import { signJwt } from "@/app/lib/jwt";
import { NextRequest } from "next/server";
import { setAuthCookie } from "@/app/lib/cookies";
import { linkUserToTableSession } from "@/app/actions/web/sessionActions";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return new Response(JSON.stringify({ error: "ユーザーが見つかりません" }), {
      status: 401,
    });
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    return new Response(
      JSON.stringify({ error: "パスワードが間違っています" }),
      { status: 401 }
    );
  }

  const token = signJwt({ id: user.id, email: user.email });
  await setAuthCookie(token);
  await linkUserToTableSession(user.id);

  return new Response(JSON.stringify({ message: "ログイン成功" }), {
    status: 200,
  });
}
