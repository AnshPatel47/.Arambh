import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

   console.log("BODY:", body);
   
    const { id, name, email, phone, company, message } = body;

    let contact;

    if (id) {
      // 1. If we already have a contactId, update the existing draft row
      contact = await prisma.contact.update({
        where: { id },
        data: { name, email, phone, company, message },
      });
    } else {
      // 2. If this is the first keystroke/save, create a new record in DB
      contact = await prisma.contact.create({
        data: { name, email, phone, company, message },
      });
    }

    return NextResponse.json({ success: true, contactId: contact.id });
  } catch (error) {
    console.error("Error saving contact data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save contact draft" },
      { status: 500 }
    );
  }
}
