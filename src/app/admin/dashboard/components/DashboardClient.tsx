"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServicesManager from "./ServicesManager";

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
}

export default function DashboardClient({ contacts }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"services" | "contacts">("services");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ name?: string; email?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const userStr = localStorage.getItem("admin_user");

    if (!token || !userStr) {
      router.replace("/admin/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const role = String(user.role).toUpperCase();
      if (role !== "ADMIN") {
        router.replace("/admin/login");
        return;
      }
      setAdminUser(user);
      setIsAuthorized(true);
    } catch (err) {
      console.error("Failed to parse admin session:", err);
      router.replace("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  const formatValue = (val: string | null | undefined) => {
    if (val === null || val === undefined || val.trim() === "") {
      return "-";
    }
    return val;
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-[#C2943A]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-sm font-medium">Verifying admin session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans pt-28 pb-6 px-6 sm:pt-32 sm:pb-10 sm:px-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-400 pb-5 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-DM sans text-zinc-900">Admin Dashboard</h1>
            <span className="px-2.5 py-0.5 text-xs text-DM sans font-semibold bg-[#C2943A]/10 text-[#C2943A] rounded-full border border-[#C2943A]/30">
              Admin Access
            </span>
          </div>
          <p className="text-zinc-700 text-DM sans text-s mt-1">
            Welcome back{adminUser?.name ? `, ${adminUser.name}` : ""} ({adminUser?.email || "admin@admin.com"})
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-DM sans text-sm transition-colors duration-200 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-zinc-300 mb-8">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 -mb-px flex items-center gap-2 cursor-pointer ${
            activeTab === "services"
              ? "border-[#C2943A] text-[#C2943A]"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Services Management
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 -mb-px flex items-center gap-2 cursor-pointer ${
            activeTab === "contacts"
              ? "border-[#C2943A] text-[#C2943A]"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contacts
        </button>
      </div>

      {/* Tab Content */}
      <main className="bg-white">
        {activeTab === "services" && <ServicesManager />}

        {activeTab === "contacts" && (
          <div className="overflow-x-auto border border-zinc-200 rounded-xl shadow-sm">
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
                      <td className="px-6 py-4">{formatValue(contact.email)}</td>
                      <td className="px-6 py-4">{formatValue(contact.phone)}</td>
                      <td className="px-6 py-4">{formatValue(contact.company)}</td>
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
