import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ slug: z.string().min(1), title: z.string().min(1), excerpt: z.string().default(""), body: z.string().min(1), published: z.boolean().default(false) });

export async function GET() {
  return NextResponse.json(await prisma.post.findMany({ orderBy: { createdAt: "desc" } }));
}
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await prisma.post.create({ data: parsed.data }), { status: 201 });
}
export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
