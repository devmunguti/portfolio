import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET ?? "dev-secret-change-me");
export const COOKIE = "admin_session";

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(secret());
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export async function isAdmin() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  try { await jwtVerify(token, secret()); return true; } catch { return false; }
}
