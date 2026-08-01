import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Create a new Schedule a Call booking
export async function POST(req: Request) {
  try {
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

// GET - Fetch Schedule a Call bookings for Admin Dashboard
export async function GET() {
  try {
    const bookings = await prisma.contact.findMany({
      where: {
        scheduleDate: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching schedule bookings:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch schedule bookings",
      },
      { status: 500 }
    );
  }
}