"use server";

import { prisma } from "@/lib/services";
import bcrypt from "bcryptjs";

export async function verifyAdminAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Admin credential is not valid" };
  }

  // 1. Database me user search karein
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // 2. User na mile YA role ADMIN na ho
  if (!user || user.role !== "ADMIN") {
    return { success: false, error: "Admin credential is not valid" };
  }

  // 3. Password verify karein
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return { success: false, error: "Admin credential is not valid" };
  }

  // Verification successful
  return { 
    success: true, 
    user: { id: user.id, name: user.name, email: user.email, role: user.role } 
  };
}