"use client";

import React, { useState } from "react";
import { verifyAdminAction } from "@/app/actions/auth";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await verifyAdminAction(formData);

    if (!res.success) {
      setError(res.error || "Admin credential is not valid");
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);
    setAdminUser(res.user);
    setLoading(false);
  }

  // ── 1. LOGIN SCREEN 
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#ffff] flex items-center justify-center p-4 font- DM sans">
        <div className="bg-[#c5cde6] rounded-2xl shadow-2xl w-full max-w-md p-8 border border-zinc-200">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-zinc-900">Admin Authentication</h1>
            <p className="text-sm text-zinc-700 mt-1">Enter your credentials to access dashboard</p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-800 mb-1">
                Admin Email / Username
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="admin@arambh.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#BD8E32] focus:outline-none transition-all text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#BD8E32] focus:outline-none transition-all text-zinc-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#179b4a] hover:bg-[#79c592] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer text-base"
            >
              {loading ? "Verifying Role..." : "Verify & Open Dashboard"}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ── 2. ADMIN DASHBOARD CONTENT 
  return (
    <div className="min-h-screen bg-[#ffff] p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#ffff] p-6 rounded-2xl shadow-sm border border-zinc-200 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Services Admin Dashboard</h1>
            <p className="text-sm text-zinc-500">Welcome, {adminUser?.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-amber-100 text-[#BD8E32] font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
              Role: {adminUser?.role}
            </span>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Lock Dashboard
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-300 shadow-sm">
            <h3 className="font-bold text-zinc-900 text-lg mb-2">Add New Service</h3>
            <p className="text-sm text-zinc-500 mb-4">Create a new advisory service item.</p>
            <button className="w-full bg-[#BD8E32] text-white py-2.5 rounded-xl font-semibold hover:bg-[#764A04] transition-all cursor-pointer">
              + Add Service
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 text-lg mb-2">Update Services</h3>
            <p className="text-sm text-zinc-500 mb-4">Edit titles, descriptions, and images.</p>
            <button className="w-full bg-zinc-900 text-white py-2.5 rounded-xl font-semibold hover:bg-zinc-800 transition-all cursor-pointer">
              Edit Services
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 text-lg mb-2">Delete Services</h3>
            <p className="text-sm text-zinc-500 mb-4">Remove inactive or outdated services.</p>
            <button className="w-full bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700 transition-all cursor-pointer">
              Manage / Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}