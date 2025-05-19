import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";

const SECRET_KEY = process.env.JWT_SECRET || "your-default-secret";

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login"); // 未ログイン → リダイレクト
  }

  try {
    const decoded = verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    redirect("/auth/login"); // トークン無効 → リダイレクト
  }
}
