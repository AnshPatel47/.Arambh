import { prisma } from "@/lib/prisma";
import DashboardClient from "./components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return <DashboardClient contacts={contacts} dbError={null} />;
  } catch (error: unknown) {
    console.error("Database connection failed on admin dashboard:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to retrieve contacts from database.";
    return (
      <DashboardClient
        contacts={[]}
        dbError={errorMessage}
      />
    );
  }
}
