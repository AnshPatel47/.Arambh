import { prisma } from "@/lib/services";
import DashboardClient from "./components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  try {
    const [contacts, bookings] = await Promise.all([
      // Normal contact submissions
      prisma.contact.findMany({
        where: {
          OR: [
            {
              scheduleDate: null,
            },
            {
              scheduleDate: {
                isSet: false,
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      // Schedule a Call bookings
      prisma.contact.findMany({
        where: {
          scheduleDate: {
            not: null,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return (
      <DashboardClient
        contacts={contacts}
        bookings={bookings}
        dbError={null}
      />
    );
  } catch (error: unknown) {
    console.error(
      "Database connection failed on admin dashboard:",
      error
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to retrieve data from database.";

    return (
      <DashboardClient
        contacts={[]}
        bookings={[]}
        dbError={errorMessage}
      />
    );
  }
}