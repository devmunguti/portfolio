import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (password && email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    await createSession();
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
}
