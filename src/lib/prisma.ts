import { PrismaClient } from "@prisma/client";

const g = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient | null {
  try {
    if (!process.env.DATABASE_URL) {
      return null;
    }
    return g.prisma ?? new PrismaClient();
  } catch {
    return null;
  }
}

export const prisma = (createPrismaClient() ?? ({} as unknown)) as PrismaClient;
if (process.env.NODE_ENV !== "production" && prisma && "project" in prisma) {
  g.prisma = prisma;
}

/** Run a query; return fallback if the database isn't configured yet. */
export async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    if (!prisma || !("project" in prisma)) {
      return fallback;
    }
    return await fn();
  } catch {
    return fallback;
  }
}
