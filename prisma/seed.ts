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


  // BLOG POSTS

  const blogPostsData = [
    {
      id: "how-to-register-startup-india",
      title: "How to Register Your Startup in India: The Definitive Step-by-Step Guide",
      category: "Startup Registration",
      excerpt: "A complete walkthrough of incorporating a Private Limited or LLP company, structuring founder equity, and qualifying for DPIIT recognition.",
      content: "Registering a startup in India involves key decisions about corporate structure, share capital, and director credentials. This article guides you from choosing between a Private Limited Company and an LLP to filing name approvals on the MCA portal, drafting the Memorandum of Association (MoA), obtaining GSTIN, and preparing the validation pitch deck required to unlock Startup India benefits.",
      date: "July 2026",
      readTime: "7 min read",
      authorName: "Arambh Editorial Team",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      authorRole: "Corporate Advisory Group",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "top-government-funding-schemes",
      title: "Top Government Funding Schemes Indian Founders Should Leverage in 2026",
      category: "Funding Support",
      excerpt: "Understanding the Startup India Seed Fund (SISFS), priority sector credit lines, and technology development grants to fuel your business.",
      content: "Securing initial capital is a major milestone. While venture capital grabs headlines, the Government of India provides massive non-dilutive funding lines. We break down the eligibility rules, proposal frameworks, and audit compliance benchmarks required to successfully secure up to ₹2 Crore under schemes like the SISFS and biotechnology initiatives.",
      date: "July 2026",
      readTime: "9 min read",
      authorName: "Vikas Patel",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      authorRole: "Senior Consultant, Funding",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "corporate-governance-mistakes",
      title: "5 Corporate Governance Mistakes That Can Kill Your Series-A Due Diligence",
      category: "Business Consulting",
      excerpt: "Unfiled returns, sloppy cap tables, and undocumented IP transfers are investor deal-breakers. Learn how to clean up your logs.",
      content: "During due diligence, VC auditors inspect board minutes, statutory registers, and compliance logs. Simple oversights like late filings with the registrar, missing IP assignment agreements for co-founders, or loose freelance agreements can delay or cancel funding rounds. Learn how to run a corporate compliance check before your term sheet arrives.",
      date: "June 2026",
      readTime: "6 min read",
      authorName: "Nisha Sharma",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
      authorRole: "Legal & Compliance Partner",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dpiit-recognition-benefits",
      title: "DPIIT Recognition Benefits: Beyond Just Capital Gains Tax Exemptions",
      category: "Startup Registration",
      excerpt: "Unlocking patent rebates, public procurement relaxations, and self-certification under labor and environmental laws.",
      content: "While the 3-year income tax holiday under Section 80-IAC is popular, DPIIT recognition provides broader strategic leverage. Startups qualify for an 80% rebate on patents, priority bidding in public tenders with no prior experience requirements, and relaxed self-audits, shielding early-stage teams from labor and environmental compliance checks.",
      date: "May 2026",
      readTime: "5 min read",
      authorName: "Arambh Editorial Team",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      authorRole: "Corporate Advisory Group",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "msme-registration-udyam-benefits",
      title: "MSME Registration Guide: Unlocking Collateral-Free Loans & Subsidies",
      category: "MSME Benefits",
      excerpt: "How registering on the Udyam portal unlocks lower interest rates, utility concessions, and protection against delayed payments.",
      content: "The Udyam registration portal provides small and micro-businesses with powerful legal protections. Under the MSMED Act, clients are legally bound to pay within 45 days, or face compound interest. Udyam status also qualifies companies for interest rate concessions, collateral-free credit lines, and local electricity duty exemptions.",
      date: "May 2026",
      readTime: "8 min read",
      authorName: "Rajesh Mehta",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      authorRole: "Director, MSME Relations",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "crossborder-saas-billing-rules",
      title: "Cross-Border SaaS Billing: Aligning with GST & Transfer Pricing Mandates",
      category: "Compliance & Advisory",
      excerpt: "How domestic software platforms can set up compliant export invoicing and utilize LUT for zero-rated sales.",
      content: "Selling software globally requires strict tax compliance. We analyze how Indian SaaS founders can leverage the Letter of Undertaking (LUT) to export services without paying IGST, manage foreign exchange compliance, file Input Tax Credit (ITC) refunds, and structure transfer pricing rules for US-incorporated subsidiaries.",
      date: "April 2026",
      readTime: "7 min read",
      authorName: "Siddharth Rao",
      authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
      authorRole: "Taxation Partner",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
    }
  ];

  await prisma.blog.deleteMany({});

for (const post of blogPostsData) {
  const { id, ...postDataWithoutId } = post; 
  await prisma.blog.create({
    data: postDataWithoutId,
  });
}
  console.log("Seeded all blog posts successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });