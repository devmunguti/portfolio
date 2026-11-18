import { MetadataRoute } from "next";
import { prisma, safe } from "@/lib/prisma";
import { DEFAULT_PROJECTS } from "@/lib/projects";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://devmunguti.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  /* ─── Static / anchor routes ─────────────────────────────────────────── */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/#work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  /* ─── Project pages (default + any DB-only slugs) ─────────────────────── */
  const dbProjects = await safe(
    () =>
      prisma.project.findMany({
        where: { published: true },
        select: { slug: true, createdAt: true },
      }),
    []
  );

  // Merge DB slugs + default slugs, keeping unique
  const allProjectSlugs = [
    ...DEFAULT_PROJECTS.filter((p) => p.published).map((p) => ({
      slug: p.slug,
      date: now,
    })),
    ...dbProjects
      .filter(
        (dp) => !DEFAULT_PROJECTS.some((def) => def.slug === dp.slug)
      )
      .map((dp) => ({ slug: dp.slug, date: dp.createdAt })),
  ];

  const projectRoutes: MetadataRoute.Sitemap = allProjectSlugs.map(
    ({ slug, date }) => ({
      url: `${BASE_URL}/projects/${slug}`,
      lastModified: date,
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  /* ─── Blog post pages (DB only) ───────────────────────────────────────── */
  const posts = await safe(
    () =>
      prisma.post.findMany({
        where: { published: true },
        select: { slug: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      }),
    []
  );

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.createdAt,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
