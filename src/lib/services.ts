import { prisma } from "@/lib/prisma";


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