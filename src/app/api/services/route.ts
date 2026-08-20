import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const services = await prisma.service.findMany({
      where: { status: "active" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        category: true,
        image: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ success: false });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, category, description, price, features, icon, status, type } = body;

    if (!title || !category || !description) {
      return NextResponse.json(
        { success: false, error: "Title, category, and description are required." },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug?.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newService = await prisma.service.create({
      data: {
        title,
        slug: generatedSlug,
        category,
        description,
        price: price || null,
        features: Array.isArray(features)
          ? features
          : typeof features === "string"
          ? features.split(",").map((f: string) => f.trim()).filter(Boolean)
          : [],
        icon: icon || "Briefcase",
        status: status || "active",
        type: type === "SCHEME" ? "SCHEME" : "SERVICE", // <-- Saves as SCHEME or SERVICE
      },
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error: any) {
    console.error("Error creating service:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "A record with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create record." },
      { status: 500 }
    );
  }
}