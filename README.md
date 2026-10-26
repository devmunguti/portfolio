# Portfolio

Next.js 15 + TypeScript + Tailwind, GSAP + Lenis, React Three Fiber, Prisma + Postgres.

## Setup
1. `npm install`
2. `cp .env.example .env` and fill it in (Postgres from Neon or Supabase, admin login, Resend key)
3. `npm run db:push`
4. Add your photo at `public/myphoto.jpeg`
5. `npm run dev`, then open http://localhost:3000 and sign in at /admin/login

## Structure
- `src/app` pages and API routes (contact, track, projects, posts, admin login)
- `src/components` Hero (3D blob), ProjectList (hover preview), ContactForm, SmoothScroll, admin forms
- `src/middleware.ts` protects /admin and all write APIs
- `prisma/schema.prisma` Project, Post, Message, PageView

## Deploy
Push to GitHub, import into Vercel, add the same env vars, and run `npm run db:push` once against the production database.
