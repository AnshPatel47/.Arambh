import { NextResponse } from "next/server";
import { prisma } from "@/lib/services";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev";

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

    let authenticatedUser = null;

    // 1. Demo Admin Check
    if (cleanEmail === "admin@admin.com" && cleanPassword === "admin123") {
      authenticatedUser = {
        id: "admin-id",
        name: "System Admin",
        email: "admin@admin.com",
        role: "ADMIN",
      };
    }

    // 2. Database User Lookup
    if (!authenticatedUser) {
      let user = null;
      try {
        if (prisma && prisma.user) {
          user = await prisma.user.findUnique({
            where: { email: cleanEmail },
          });
        }
      } catch (dbError) {
        console.warn("DB query error:", dbError);
      }

      if (!user) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }

      const userRoleStr = String(user.role || "").toUpperCase();
      if (userRoleStr !== "ADMIN") {
        return NextResponse.json(
          { success: false, error: "You are not admin" },
          { status: 403 }
        );
      }

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

      authenticatedUser = {
        id: user.id,
        name: user.name || "Admin User",
        email: user.email,
        role: user.role,
      };
    }

    // 🔑 3. Generate Real JWT Payload
    const token = jwt.sign(
      {
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      user: authenticatedUser,
    });

    // 🔐 4. Store Real JWT inside HTTP-Only Cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication server error." },
      { status: 500 }
    );
  }
}
