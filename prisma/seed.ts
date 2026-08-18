import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ServiceType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // ==========================================
  // ADMIN USER
  // ==========================================
  const adminEmail = "admin@arambh.com";
  const rawPassword = "AdminPassword123";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
    },
    create: {
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user seeded successfully!");

  // ==========================================
  // SERVICES & SCHEMES
  // ==========================================
  const services = [
    // --- REGULAR SERVICES (type: "SERVICE") ---
    {
      slug: "business-registration",
      title: "Business Registration",
      description:
        "Transform your idea into a legally recognized business with expert guidance at every step.",
      category: "Registration",
      price: null,
      type: ServiceType.SERVICE,
      features: [
        "Business structure guidance",
        "Documentation support",
        "Registration process assistance",
      ],
      icon: "/images/business-registration.svg",
      status: "active",
    },
    {
      slug: "startup-india-government-recognition",
      title: "Startup India & Government Recognition",
      description:
        "Government recognition can open doors to funding, tax benefits, and valuable support programs.",
      category: "Government Recognition",
      price: null,
      type: ServiceType.SERVICE,
      features: [
        "Startup India assistance",
        "DPIIT recognition",
        "MSME registration",
      ],
      icon: "/images/startup-india.svg",
      status: "active",
    },
    {
      slug: "government-funding",
      title: "Government Funding",
      description:
        "Navigating government schemes can be overwhelming. We identify funding opportunities matching your business.",
      category: "Funding",
      price: null,
      type: ServiceType.SERVICE,
      features: [
        "Funding opportunity identification",
        "Scheme guidance",
        "Documentation support",
      ],
      icon: "/images/government-funding.svg",
      status: "active",
    },
    {
      slug: "business-growth-strategy",
      title: "Business Growth Strategy",
      description:
        "Strategic guidance tailored to your goals, helping you make informed business decisions.",
      category: "Business Strategy",
      price: null,
      type: ServiceType.SERVICE,
      features: [
        "Business strategy planning",
        "Growth guidance",
        "Strategic decision support",
      ],
      icon: "/images/business-strategy.svg",
      status: "active",
    },
    {
      slug: "compliance-regulatory-support",
      title: "Compliance & Regulatory Support",
      description:
        "Managing legal and regulatory requirements cleanly without slowing your business down.",
      category: "Compliance",
      price: null,
      type: ServiceType.SERVICE,
      features: [
        "Regulatory guidance",
        "Compliance support",
        "Risk reduction",
      ],
      icon: "/images/compliance-support.svg",
      status: "active",
    },
    {
      slug: "end-to-end-advisory-services",
      title: "End-to-End Advisory Services",
      description:
        "Comprehensive solutions under one roof from registration to long-term growth.",
      category: "Advisory",
      price: null,
      type: ServiceType.SERVICE,
      features: [
        "Company registration",
        "Government recognition",
        "Long-term business advisory",
      ],
      icon: "/images/end-to-end-advisory.svg",
      status: "active",
    },

    // --- GOVERNMENT SCHEMES (type: "SCHEME") ---
    {
      slug: "naif-scheme",
      title: "NAIF Scheme",
      description:
        "The Agriculture Infrastructure Fund (AIF), also called NAIF, funds post-harvest infrastructure like cold storage, warehouses and processing units.",
      category: "Government Scheme",
      price: "UP TO ₹2 CRORE",
      type: ServiceType.SCHEME,
      bgColor: "#EAF5EA",
      features: [
        "Post-harvest infrastructure",
        "Cold storage & warehouses",
        "Processing unit grants",
      ],
      icon: "/images/naif.svg",
      status: "active",
    },
    {
      slug: "startup-india-seed-fund",
      title: "Startup India Seed Fund (SISFS)",
      description:
        "Access milestone-based grants for proof of concept and debt/convertible funding for market entry and scale.",
      category: "Government Scheme",
      price: "UP TO ₹500 LAKHS",
      type: ServiceType.SCHEME,
      bgColor: "#FDF2F2",
      features: [
        "Proof of concept grants",
        "Debt/Convertible funding",
        "Market entry support",
      ],
      icon: "/images/sisfs.svg",
      status: "active",
    },
    {
      slug: "real-time-performance-visibility",
      title: "Real-Time Performance Visibility",
      description:
        "Track how work progresses as it happens. OptiCore updates continuously, allowing leaders to spot shifts in productivity.",
      category: "Government Scheme",
      price: "UP TO ₹500 LAKHS",
      type: ServiceType.SCHEME,
      bgColor: "#EFF6FF",
      features: [
        "Real-time tracking",
        "Productivity updates",
        "Leadership analytics",
      ],
      icon: "/images/real-time.svg",
      status: "active",
    },
  ];

  for (const service of services) {
    // 1. Destructure to remove bgColor and extract properties cleanly
    const { bgColor, ...data } = service;

    const seededService = await prisma.service.upsert({
      where: { slug: data.slug },
      update: {
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        type: data.type as any,
        features: data.features,
        icon: data.icon,
        status: data.status,
      },
      create: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        type: data.type as any,
        features: data.features,
        icon: data.icon,
        status: data.status,
      },
    });

    console.log(`Seeded [${seededService.type}]: ${seededService.title}`);
  }

  console.log("All services & schemes seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });