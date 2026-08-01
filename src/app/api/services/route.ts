import { NextResponse } from "next/server";
import { prisma } from "@/lib/services";

export async function GET() {
  try {
    let services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    // if (services.length === 0) {
    //   try {
    //     services = await prisma.service.findMany({
    //       orderBy: { createdAt: "desc" },
    //     });
    //   } catch (seedErr) {
    //     console.warn("Auto seed warning, returning memory fallback:", seedErr);
    //     return NextResponse.json({ success: true, services });
    //   }
    // }

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ success: false });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, category, description, price, features, icon, status } = body;

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
      },
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error: any) {
    console.error("Error creating service:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "A service with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create service." },
      { status: 500 }
    );
  }
}
