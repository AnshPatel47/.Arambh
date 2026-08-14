import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_for_dev"
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/admin/dashboard");

  if (isDashboardRoute) {
    if (!token) {
      // 🔄 Redirect to /admin/login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};