import { prisma } from "@/lib/prisma";
import DashboardClient from "./components/DashboardClient";
import { ServiceType } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  try {
    const [services, schemes, contacts, bookings] = await Promise.all([
      // Use ServiceType Enum instead of raw strings
      prisma.service.findMany({
        where: { type: ServiceType.SERVICE },
        orderBy: { createdAt: "desc" },
      }),

      prisma.service.findMany({
        where: { type: ServiceType.SCHEME },
        orderBy: { createdAt: "desc" },
      }),

      prisma.contact.findMany({
        where: {
          OR: [
            { scheduleDate: null },
            { scheduleDate: { isSet: false } },
          ],
        },
        orderBy: { createdAt: "desc" },
      }),

      prisma.contact.findMany({
        where: { scheduleDate: { not: null } },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return (
      <DashboardClient
        services={services}
        schemes={schemes}
        contacts={contacts}
        bookings={bookings}
        dbError={null}
      />
    );
  } catch (error: unknown) {
    console.error("Database connection failed on admin dashboard:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to retrieve data from database.";

    return (
      <DashboardClient
        services={[]}
        schemes={[]}
        contacts={[]}
        bookings={[]}
        dbError={errorMessage}
      />
    );
  }
}