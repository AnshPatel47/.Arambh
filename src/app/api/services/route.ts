import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ServiceType } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type");

    // Build Prisma query condition safely
    const whereClause: any = {
      status: "active", // Ensure only published/active services are fetched for users
    };

    if (typeParam) {
      whereClause.type = typeParam as ServiceType;
    }

    const services = await prisma.service.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ success: false, services: [] }, { status: 500 });
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
        type: (type === "SCHEME" ? "SCHEME" : "SERVICE") as ServiceType,
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