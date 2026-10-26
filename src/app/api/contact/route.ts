import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const schema = z.object({ name: z.string().min(1).max(100), email: z.string().email(), body: z.string().min(5).max(4000) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please fill in every field with a valid email." }, { status: 400 });
  const { name, email, body } = parsed.data;

  await prisma.message.create({ data: { name, email, body } });

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: body,
    });
  }
  return NextResponse.json({ ok: true });
}
