import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const cleanPassword = String(password).trim();

    // 1. Direct Demo Admin Check (Fast path)
    if (cleanEmail === "admin@admin.com" && cleanPassword === "admin123") {
      return NextResponse.json({
        success: true,
        message: "Admin authentication successful",
        user: {
          id: "admin-id",
          name: "System Admin",
          email: "admin@admin.com",
          role: "ADMIN",
        },
      });
    }

    // 2. Direct Non-Admin Check for demo user accounts
    if (cleanEmail.includes("user") || cleanPassword === "user123") {
      return NextResponse.json(
        { success: false, error: "You are not admin" },
        { status: 403 }
      );
    }

    // 3. Database User Lookup
    let user = null;
    try {
      if (prisma && prisma.user) {
        user = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });
      }
    } catch (dbError) {
      console.warn("DB user query warning:", dbError);
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 4. Role Verification: Must be ADMIN
    const userRoleStr = String(user.role || "").toUpperCase();
    if (userRoleStr !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "You are not admin" },
        { status: 403 }
      );
    }

    // 5. Password Verification
    let isValidPassword = false;
    try {
      if (user.password && user.password.startsWith("$2")) {
        isValidPassword = await bcrypt.compare(cleanPassword, user.password);
      } else {
        isValidPassword = user.password === cleanPassword;
      }
    } catch (e) {
      isValidPassword = user.password === cleanPassword;
    }

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name || "Admin User",
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication server error. Please try again." },
      { status: 500 }
    );
  }
}
