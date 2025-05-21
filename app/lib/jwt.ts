import jwt, { Secret } from "jsonwebtoken";

// JWT シークレットを取得
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not set in environment variables");
}
const SECRET: Secret = secret;

// ユーザーの JWT に含まれる情報の型
export type JwtPayload = {
  id: number;
  email: string;
  role: "ADMIN" | "CUSTOMER";
};

// トークンの有効期限
type Exp = `${number}${"d" | "h" | "m" | "s"}`;

// JWTの署名
export function signJwt(payload: JwtPayload, expiresIn: Exp = "1d"): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

// JWTの検証
export function verifyJwt<T = JwtPayload>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch (err) {
    console.warn("Invalid JWT:", err);
    return null;
  }
}
