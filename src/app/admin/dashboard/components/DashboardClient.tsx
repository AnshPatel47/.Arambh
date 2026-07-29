"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Contact {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  message: string | null;
  createdAt: Date | string;
}

interface DashboardClientProps {
  contacts: Contact[];
  dbError?: string | null;
}

export default function DashboardClient({ contacts, dbError }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"services" | "contacts">("contacts");
  const router = useRouter();

  React.useEffect(() => {
    if (dbError) {
      console.error("MongoDB Connection Error on admin dashboard:", dbError);
    }
  }, [dbError]);

  const handleLogout = () => {
    // Clear any authentication state if needed, then redirect
    router.push("/admin/login");
  };

  const formatValue = (val: string | null | undefined) => {
    if (val === null || val === undefined || val.trim() === "") {
      return "-";
    }
    return val;
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 pt-28 pb-6 px-6 sm:pt-32 sm:pb-10 sm:px-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-200 pb-5 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Admin Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage portal inquiries and configuration</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors duration-200 shadow-sm"
        >
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 mb-8">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 -mb-px ${
            activeTab === "services"
              ? "border-[#C2943A] text-[#C2943A]"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 -mb-px ${
            activeTab === "contacts"
              ? "border-[#C2943A] text-[#C2943A]"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          Contacts
        </button>
      </div>

      {/* Tab Content */}
      <main className="bg-white">
        {activeTab === "services" && (
          <div className="p-12 text-center border border-dashed border-zinc-300 rounded-lg max-w-lg mx-auto mt-8">
            <h2 className="text-xl font-semibold text-zinc-700 mb-2">Services Module</h2>
            <p className="text-zinc-500">Coming Soon...</p>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="overflow-x-auto border border-zinc-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-600 uppercase font-semibold text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-zinc-500">
                      No contacts found in the database.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-zinc-50 transition-colors duration-150">
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        {formatValue(contact.name)}
                      </td>
                      <td className="px-6 py-4">
                        {formatValue(contact.email)}
                      </td>
                      <td className="px-6 py-4">
                        {formatValue(contact.phone)}
                      </td>
                      <td className="px-6 py-4">
                        {formatValue(contact.company)}
                      </td>
                      <td className="px-6 py-4 whitespace-pre-wrap max-w-xs break-words">
                        {formatValue(contact.message)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-zinc-500 text-xs" suppressHydrationWarning>
                        {new Date(contact.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
