import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET ?? "dev-secret-change-me");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin/login");
  const isWriteApi = pathname.startsWith("/api/projects") || pathname.startsWith("/api/posts");
  const needsAuth = (pathname.startsWith("/admin") && !isLogin) || (isWriteApi && req.method !== "GET");
  if (!needsAuth) return NextResponse.next();

  const token = req.cookies.get("admin_session")?.value;
  try {
    if (!token) throw new Error("no token");
    await jwtVerify(token, secret());
    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}
export const config = { matcher: ["/admin/:path*", "/api/projects/:path*", "/api/posts/:path*"] };
