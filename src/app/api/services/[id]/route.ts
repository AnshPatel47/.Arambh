import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, slug, category, description, price, features, icon, status, type } = body;

    const formattedFeatures = Array.isArray(features)
      ? features
      : typeof features === "string"
      ? features.split(",").map((f: string) => f.trim()).filter(Boolean)
      : [];

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(category && { category }),
        ...(description && { description }),
        price: price !== undefined ? price : null,
        features: formattedFeatures,
        ...(icon && { icon }),
        ...(status && { status }),
        ...(type && { type }), // <-- Allows updating type if passed
      },
    });

    return NextResponse.json({ success: true, service: updatedService });
  } catch (error: any) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update record." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete item" },
      { status: 500 }
    );
  }
}