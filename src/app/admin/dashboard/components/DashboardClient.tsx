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
  contacts: Contact[];
  bookings: Booking[];
  dbError?: string | null;
}

export default function DashboardClient({
  contacts,
  bookings,
  dbError,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<
    "services" | "contacts" | "schedule"
  >("contacts");

  const router = useRouter();

  useEffect(() => {
    if (dbError) {
      console.error(
        "Database Connection Error on admin dashboard:",
        dbError
      );
    }
  }, [dbError]);

  // (Cookie-based Logout)
const handleLogout = async () => {
  try {
    // 1. Call API to clear the HTTP-only cookie
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    // 2. Clear any leftover user state if present
    localStorage.removeItem("admin_user");

    // 3. Redirect to login page
    router.push("/login"); // or "/admin/login" depending on your route
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

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 mb-8">
        {/* Services */}
        <button
          onClick={() => setActiveTab("services")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 -mb-px whitespace-nowrap ${
            activeTab === "services"
              ? "border-[#C2943A] text-[#C2943A]"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          Services
        </button>

        {/* Contacts */}
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 -mb-px whitespace-nowrap ${
            activeTab === "contacts"
              ? "border-[#C2943A] text-[#C2943A]"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          Contacts
        </button>

        {/* Schedule Booking */}
        <button
          onClick={() => setActiveTab("schedule")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 -mb-px whitespace-nowrap ${
            activeTab === "schedule"
              ? "border-[#C2943A] text-[#C2943A]"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          Schedule Booking
        </button>
      </div>

      {/* Tab Content */}
      <main className="bg-white">
        {/* Services Tab */}
        {activeTab === "services" && <ServicesManager />}

        {/* Contacts Tab */}
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
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-zinc-500"
                    >
                      No contacts found in the database.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-zinc-50 transition-colors duration-150"
                    >
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

                      <td
                        className="px-6 py-4 whitespace-nowrap text-zinc-500 text-xs"
                        suppressHydrationWarning
                      >
                        {new Date(contact.createdAt).toLocaleString(
                          undefined,
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Schedule Booking Tab */}
        {activeTab === "schedule" && (
          <div className="overflow-x-auto border border-zinc-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-600 uppercase font-semibold text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Schedule Date</th>
                  <th className="px-6 py-4">Schedule Time</th>
                  <th className="px-6 py-4">Notes</th>
                  <th className="px-6 py-4">Guests</th>
                  <th className="px-6 py-4">Created At</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                {bookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-zinc-500"
                    >
                      No schedule bookings found in the database.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-zinc-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        {formatValue(booking.name)}
                      </td>

                      <td className="px-6 py-4">
                        {formatValue(booking.email)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatScheduleDate(booking.scheduleDate)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatValue(booking.scheduleTime)}
                      </td>

                      <td className="px-6 py-4 whitespace-pre-wrap max-w-xs break-words">
                        {formatValue(booking.scheduleNotes)}
                      </td>

                      <td className="px-6 py-4">
                        {booking.scheduleGuests?.length > 0
                          ? booking.scheduleGuests.join(", ")
                          : "-"}
                      </td>

                      <td
                        className="px-6 py-4 whitespace-nowrap text-zinc-500 text-xs"
                        suppressHydrationWarning
                      >
                        {new Date(booking.createdAt).toLocaleString(
                          undefined,
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }
                        )}
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
