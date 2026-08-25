"use client";

import React, { useEffect, useState } from "react";
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
  scheduleDate?: Date | string | null;
}

interface Booking {
  id: string;
  name: string | null;
  email: string | null;
  scheduleDate: Date | string | null;
  scheduleTime: string | null;
  scheduleNotes: string | null;
  scheduleGuests: string[];
  createdAt: Date | string;
}

interface DashboardClientProps {
  services?: any[];
  schemes?: any[];
  contacts: Contact[];
  bookings: Booking[];
  dbError?: string | null;
}

export default function DashboardClient({
  services = [],
  schemes = [],
  contacts,
  bookings,
  dbError,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"services" | "contacts" | "schedule">("services");
  const [typeFilter, setTypeFilter] = useState<"SERVICE" | "SCHEME">("SERVICE");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const router = useRouter();

const toggleRowExpand = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

 const renderCleanCell = (text: string | null | undefined, isExpanded: boolean) => {
    if (!text || text.trim() === "") return "-";

    return (
      <div className="w-full overflow-hidden">
        {isExpanded ? (
          <p className="whitespace-pre-wrap break-words text-zinc-800 leading-normal">
            {text}
          </p>
        ) : (
          <span className="block truncate text-zinc-700 w-full" title={text}>
            {text}
          </span>
        )}
      </div>
    );
  };
  const combinedItems = [
    ...services.map((s) => ({ ...s, type: s.type || "SERVICE" })),
    ...schemes.map((s) => ({ ...s, type: s.type || "SCHEME" })),
  ];

  const filteredItems = combinedItems.filter(
    (item) => String(item.type).toUpperCase() === typeFilter
  );

  useEffect(() => {
    if (dbError) {
      console.error(
        "Database Connection Error on admin dashboard:",
        dbError
      );
    }
  }, [dbError]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      localStorage.removeItem("admin_user");
      router.push("/admin/login"); 
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const formatValue = (val: string | null | undefined) => {
    if (val === null || val === undefined || val.trim() === "") {
      return "-";
    }

    return val;
  };

  const formatScheduleDate = (date: Date | string | null) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(undefined, {
      dateStyle: "medium",
    });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 pt-28 pb-6 px-6 sm:pt-32 sm:pb-10 sm:px-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-400 pb-5 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Admin Dashboard
          </h1>

          <p className="text-zinc-500 text-sm mt-1">
            Manage portal inquiries and configuration
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors duration-200 shadow-sm"
        >
          Logout
        </button>
      </header>

      {/* Tabs Bar */}
      <div className="w-full overflow-x-auto border-b border-zinc-200 mb-8 scrollbar-none [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nav className="flex space-x-2 border-b-0 w-max">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-3 font-semibold text-sm transition-all duration-200 whitespace-nowrap relative ${
              activeTab === "services"
                ? "text-[#C2943A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C2943A]"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Services & Schemes
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-3 font-semibold text-sm transition-all duration-200 whitespace-nowrap relative ${
              activeTab === "contacts"
                ? "text-[#C2943A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C2943A]"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Contacts
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-6 py-3 font-semibold text-sm transition-all duration-200 whitespace-nowrap relative ${
              activeTab === "schedule"
                ? "text-[#C2943A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C2943A]"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Schedule Booking
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <main className="bg-white">
      {/* Services & Schemes Tab */}
{activeTab === "services" && (
  <ServicesManager items={combinedItems} />
)}
      {/* Contacts Tab */}
{activeTab === "contacts" && (
  <div className="overflow-x-auto border border-zinc-200 rounded-lg shadow-sm">
    <table className="min-w-full divide-y divide-zinc-200 text-left text-sm table-fixed sm:table-auto">
      <thead className="bg-zinc-50 text-zinc-600 uppercase font-semibold text-xs tracking-wider">
        <tr>
          <th className="px-6 py-4 w-36">Name</th>
          <th className="px-6 py-4 w-44">Email</th>
          <th className="px-6 py-4 w-32">Phone</th>
          <th className="px-6 py-4 w-36">Company</th>
       <th className="px-6 py-4 w-[260px] min-w-[260px]">Message</th>
          <th className="px-6 py-4 w-40">Date</th>
          <th className="px-6 py-4 w-24 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
        {contacts.length === 0 ? (
          <tr>
            <td colSpan={7} className="px-6 py-10 text-center text-zinc-500">
              No contacts found in the database.
            </td>
          </tr>
        ) : (
    contacts.map((contact) => {
            const isExpanded = !!expandedRows[contact.id];
            const hasLongContent = (contact.message?.length || 0) > 25;

            return (
              <tr key={contact.id} className="hover:bg-zinc-50 transition-colors duration-150 align-middle border-b border-zinc-200">
                <td className="px-6 py-4 font-medium text-zinc-900 truncate max-w-[140px]">{formatValue(contact.name)}</td>
                <td className="px-6 py-4 truncate max-w-[180px]">{formatValue(contact.email)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatValue(contact.phone)}</td>
                <td className="px-6 py-4 truncate max-w-[140px]">{formatValue(contact.company)}</td>
               <td className="px-6 py-4 w-[260px] max-w-[260px]">
                  {renderCleanCell(contact.message, isExpanded)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-zinc-500 text-xs">
                  {new Date(contact.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {hasLongContent && (
                    <button
                      type="button"
                      onClick={() => toggleRowExpand(contact.id)}
                      className="text-xs font-semibold text-[#C2943A] hover:underline cursor-pointer select-none"
                    >
                      {isExpanded ? "Less" : "View"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
)}

        {/* Schedule Booking Tab */}
{activeTab === "schedule" && (
  <div className="overflow-x-auto border border-zinc-200 rounded-lg shadow-sm">
    <table className="w-full text-left text-sm table-fixed min-w-[900px] divide-y divide-zinc-200">
      <thead className="bg-zinc-50 text-zinc-600 uppercase font-semibold text-xs tracking-wider">
        <tr>
        <th className="px-6 py-4 w-[140px]">Name</th>
          <th className="px-6 py-4 w-[180px]">Email</th>
          <th className="px-6 py-4 w-[130px]">Schedule Date</th>
          <th className="px-6 py-4 w-[120px]">Schedule Time</th>
          <th className="px-6 py-4 w-[200px]">Notes</th>
          <th className="px-6 py-4 w-[200px]">Guests</th>
          <th className="px-6 py-4 w-[140px]">Created At</th>
          <th className="px-6 py-4 w-[110px] text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
        {bookings.length === 0 ? (
          <tr>
            <td colSpan={8} className="px-6 py-10 text-center text-zinc-500">
              No schedule bookings found in the database.
            </td>
          </tr>
        ) : (
        bookings.map((booking) => {
            const isExpanded = !!expandedRows[booking.id];
            const guestsText = booking.scheduleGuests?.length > 0 ? booking.scheduleGuests.join(", ") : null;
            const hasLongContent = (booking.scheduleNotes?.length || 0) > 25 || (guestsText?.length || 0) > 25;

            return (
              <tr key={booking.id} className="hover:bg-zinc-50 transition-colors duration-150 align-middle border-b border-zinc-200">
<td className="px-6 py-4 font-medium text-zinc-900 truncate">{formatValue(booking.name)}</td>
                <td className="px-6 py-4 truncate">{formatValue(booking.email)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatScheduleDate(booking.scheduleDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatValue(booking.scheduleTime)}</td>
                <td className="px-6 py-4 overflow-hidden">
                  {renderCleanCell(booking.scheduleNotes, isExpanded)}
                </td>
                <td className="px-6 py-4 overflow-hidden">
                  {renderCleanCell(guestsText, isExpanded)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-zinc-500 text-xs">
                  {new Date(booking.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {hasLongContent && (
                    <button
                      type="button"
                      onClick={() => toggleRowExpand(booking.id)}
                      className="text-xs font-semibold text-[#C2943A] hover:underline cursor-pointer select-none"
                    >
                      {isExpanded ? "Less" : "View"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
)}
      </main>
    </div>
  );
}