import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Fetch all services for listing
export async function getAllServices() {
  try {
    return await prisma.service.findMany();
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

// Fetch single service by slug or id
export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Failed to fetch service detail:", error);
    return null;
  }
}