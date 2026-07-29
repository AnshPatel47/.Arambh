import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal - Arambh Advisory",
  description: "Admin panel for managing inquiries and portal configurations",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-layout">{children}</div>;
}
