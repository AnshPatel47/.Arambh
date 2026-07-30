import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Get data sent from the Schedule a Call form
    const body = await req.json();

    const {
      name,
      email,
      date,
      time,
      notes,
      guests,
    } = body;

    // Required fields validation
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, date and time are required",
        },
        { status: 400 }
      );
    }

    // Create a NEW Contact document for this Schedule Booking
    const booking = await prisma.contact.create({
      data: {
        name,
        email,
        scheduleDate: new Date(date),
        scheduleTime: time,
        scheduleNotes: notes || null,
        scheduleGuests: Array.isArray(guests) ? guests : [],
      },
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating schedule booking:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create schedule booking",
      },
      { status: 500 }
    );
  }
}