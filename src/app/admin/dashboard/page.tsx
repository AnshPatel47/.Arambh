import { prisma } from "@/lib/services";
import DashboardClient from "./components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let contacts: any[] = [];
  try {
    if (prisma && (prisma as any).contact) {
      contacts = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (error) {
    console.warn("Could not query contacts from Prisma DB, falling back safely:", error);
  }

  return <DashboardClient contacts={contacts} />;
}
