import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_SEED_SERVICES = [
  {
    id: "seed-1",
    title: "Business Registration",
    slug: "business-registration",
    category: "Registration",
    description:
      "Transform your idea into a legally recognized business with expert guidance at every step. We help you choose the right business structure, manage documentation, and complete the registration process efficiently.",
    price: "499",
    features: [
      "Pvt Ltd / LLP / OPC Registration",
      "Digital Signature (DSC) & DIN",
      "Name Approval & SPICe+ Filing",
      "PAN & TAN Allocation",
    ],
    icon: "Building2",
    status: "active",
  },
  {
    id: "seed-2",
    title: "Startup India & Government Recognition",
    slug: "startup-recognition",
    category: "Recognition",
    description:
      "Government recognition can open doors to funding, tax benefits, and valuable support programs. Our team assists you in obtaining Startup India, DPIIT, MSME, and other relevant registrations, ensuring a smooth and hassle-free application process.",
    price: "299",
    features: [
      "DPIIT Certificate Recognition",
      "Tax Exemption (80-IAC) Support",
      "MSME Udyam Registration",
      "GeM Portal Registration",
    ],
    icon: "Award",
    status: "active",
  },
  {
    id: "seed-3",
    title: "Government Funding & Grants",
    slug: "funding-grants",
    category: "Funding",
    description:
      "Navigating government schemes can be overwhelming. We identify funding opportunities that match your business, prepare the required documentation, and guide you through the application process to improve your chances of success.",
    price: "999",
    features: [
      "Startup India Seed Fund Scheme",
      "Pitch Deck & Financial Model Drafting",
      "Grant Proposal Documentation",
      "State-level Incubator Approvals",
    ],
    icon: "Landmark",
    status: "active",
  },
  {
    id: "seed-4",
    title: "Business Strategy & Growth Consulting",
    slug: "strategy-growth",
    category: "Consulting",
    description:
      "Whether you're launching a new venture or scaling an existing business, we provide strategic guidance tailored to your goals. From business planning to market positioning and growth roadmaps, we help you make informed decisions with confidence.",
    price: "799",
    features: [
      "Market Research & Competitor Analysis",
      "Go-To-Market (GTM) Strategy",
      "Cap Table & Valuation Advisory",
      "Monthly Strategic Review Meetings",
    ],
    icon: "TrendingUp",
    status: "active",
  },
  {
    id: "seed-5",
    title: "Compliance & Regulatory Support",
    slug: "compliance-regulatory",
    category: "Compliance",
    description:
      "Managing legal and regulatory requirements shouldn't slow your business down. We provide ongoing compliance support, helping you meet statutory obligations, reduce risks, and maintain smooth business operations throughout your journey.",
    price: "399",
    features: [
      "Annual ROC Filings & Secretarial Audit",
      "GST Return Filing & Reconciliation",
      "TDS & Income Tax Compliances",
      "Labour & EPF/ESI Registrations",
    ],
    icon: "ShieldCheck",
    status: "active",
  },
  {
    id: "seed-6",
    title: "End-to-End Advisory Services",
    slug: "end-to-end",
    category: "Advisory",
    description:
      "From company registration and government recognition to funding support and long-term business advisory, Arambh Advisory offers comprehensive solutions under one roof. Our integrated approach ensures you always have expert guidance as your business evolves.",
    price: "1499",
    features: [
      "Dedicated Legal & Financial Manager",
      "Complete Startup Ecosystem Setup",
      "Priority Government Clearance",
      "Unlimited Consultation Support",
    ],
    icon: "Briefcase",
    status: "active",
  },
];

export async function GET() {
  try {
    let services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (services.length === 0) {
      try {
        await prisma.service.createMany({
          data: DEFAULT_SEED_SERVICES.map((s) => ({
            title: s.title,
            slug: s.slug,
            category: s.category,
            description: s.description,
            price: s.price,
            features: s.features,
            icon: s.icon,
            status: s.status,
          })),
        });
        services = await prisma.service.findMany({
          orderBy: { createdAt: "desc" },
        });
      } catch (seedErr) {
        console.warn("Auto seed warning, returning memory fallback:", seedErr);
        return NextResponse.json({ success: true, services: DEFAULT_SEED_SERVICES });
      }
    }

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ success: true, services: DEFAULT_SEED_SERVICES });
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
