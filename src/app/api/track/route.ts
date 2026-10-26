import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { path, referrer } = await req.json().catch(() => ({}));
  if (typeof path === "string" && path.length < 300 && !path.startsWith("/admin")) {
    await prisma.pageView.create({ data: { path, referrer: typeof referrer === "string" ? referrer.slice(0, 300) : null } }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
