"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const userStr = localStorage.getItem("admin_user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        const role = String(user.role).toUpperCase();
        if (role === "ADMIN") {
          router.replace("/admin/dashboard");
          return;
        }
      } catch (err) {
        console.error("Auth token parse error:", err);
      }
    }

    router.replace("/admin/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#ffff] flex items-center justify-center text-white">
      <div className="flex items-center gap-3">
        <svg className="animate-spin h-6 w-6 text-[#C2943A]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Checking authorization...</span>
      </div>
    </div>
  );
}
