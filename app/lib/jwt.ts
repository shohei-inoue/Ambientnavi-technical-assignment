import jwt, { Secret } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not set in environment variables");
}
const SECRET: Secret = secret; // ここで型が確定する

type Exp = `${number}${"d" | "h" | "m" | "s"}`; // "7d", "1h" などに限定

export function signJwt(payload: object, expiresIn: Exp = "7d") {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch {
    return null;
  }
}
