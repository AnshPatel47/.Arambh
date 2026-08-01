import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
  console.log(`Email:    ${adminUser.email}`);
  console.log(`Password: ${rawPassword}`);
  console.log(`Role:     ${adminUser.role}`);

  // ==========================================
  // SERVICES
  // ==========================================

  const services = [
    {
      slug: "business-registration",
      title: "Business Registration",
      description:
        "Transform your idea into a legally recognized business with expert guidance at every step. We help you choose the right business structure, manage documentation, and complete the registration process efficiently.",
      category: "Registration",
      price: null,
      features: [
        "Business structure guidance",
        "Documentation support",
        "Registration process assistance",
      ],
      icon: "/images/business-registration.svg",
      image: "/images/business-registration.png",
      status: "active",
    },
    {
      slug: "startup-india-government-recognition",
      title: "Startup India & Government Recognition",
      description:
        "Government recognition can open doors to funding, tax benefits, and valuable support programs. Our team assists you in obtaining Startup India, DPIIT, MSME, and other relevant registrations.",
      category: "Government Recognition",
      price: null,
      features: [
        "Startup India assistance",
        "DPIIT recognition",
        "MSME registration",
      ],
      icon: "/images/startup-india.svg",
      image: "/images/startup-india.png",
      status: "active",
    },
    {
      slug: "government-funding",
      title: "Government Funding",
      description:
        "Navigating government schemes can be overwhelming. We identify funding opportunities that match your business and guide you through documentation and application processes.",
      category: "Funding",
      price: null,
      features: [
        "Funding opportunity identification",
        "Scheme guidance",
        "Documentation support",
        "Application assistance",
      ],
      icon: "/images/government-funding.svg",
      image: "/images/government-funding.png",
      status: "active",
    },
    {
      slug: "business-growth-strategy",
      title: "Business Growth Strategy",
      description:
        "Whether you're launching a new venture or scaling an existing business, we provide strategic guidance tailored to your goals, helping you make informed business decisions.",
      category: "Business Strategy",
      price: null,
      features: [
        "Business strategy planning",
        "Growth guidance",
        "Strategic decision support",
      ],
      icon: "/images/business-strategy.svg",
      image: "/images/business-growth-strategy.png",
      status: "active",
    },
    {
      slug: "compliance-regulatory-support",
      title: "Compliance & Regulatory Support",
      description:
        "Managing legal and regulatory requirements shouldn't slow your business down. We ensure ongoing compliance, helping you meet statutory obligations and reduce risks.",
      category: "Compliance",
      price: null,
      features: [
        "Regulatory guidance",
        "Compliance support",
        "Statutory obligation assistance",
        "Risk reduction",
      ],
      icon: "/images/compliance-support.svg",
      image: "/images/compliance-support.png",
      status: "active",
    },
    {
      slug: "end-to-end-advisory-services",
      title: "End-to-End Advisory Services",
      description:
        "From company registration and government recognition to funding support and long-term business advisory, Arambh Advisory provides comprehensive solutions under one roof.",
      category: "Advisory",
      price: null,
      features: [
        "Company registration",
        "Government recognition",
        "Funding support",
        "Long-term business advisory",
      ],
      icon: "/images/end-to-end-advisory.svg",
      image: "/images/end-to-end-advisory.png",
      status: "active",
    },
  ];

  for (const service of services) {
    const seededService = await prisma.service.upsert({
      where: {
        slug: service.slug,
      },
      update: {
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        features: service.features,
        icon: service.icon,
        image: service.image,
        status: service.status,
      },
      create: service,
    });

    console.log(`Service seeded: ${seededService.title}`);
  }

  console.log("All services seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
