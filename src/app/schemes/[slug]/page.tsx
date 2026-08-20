import React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Briefcase, 
  Building2, 
  Landmark, 
  Coins, 
  Wallet, 
  Sprout, 
  GraduationCap, 
  HeartPulse, 
  Rocket, 
  ShieldCheck, 
  Award 
} from "lucide-react";
import { notFound } from "next/navigation";
import { DM_Sans } from "next/font/google";
import ScrollToTopButton from "@/components/scrollarrow/ScrollToTopButton";
import { prisma } from "@/lib/prisma";
import { schemes as initialSchemes } from "@/components/home/hero/hero.data";
import Image from "next/image";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

// Map Lucide icons by exact icon name string
const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Building2,
  Landmark,
  Coins,
  Wallet,
  Sprout,
  GraduationCap,
  HeartPulse,
  Rocket,
  ShieldCheck,
  Award,
};

// Automatic fallback based on title keywords
const getMatchingIconByTitle = (title: string = ""): React.ElementType => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("loan") || lowerTitle.includes("bank") || lowerTitle.includes("subsidy")) return Landmark;
  if (lowerTitle.includes("finance") || lowerTitle.includes("fund") || lowerTitle.includes("money")) return Coins;
  if (lowerTitle.includes("business") || lowerTitle.includes("job") || lowerTitle.includes("work")) return Briefcase;
  if (lowerTitle.includes("startup") || lowerTitle.includes("tech") || lowerTitle.includes("innovation")) return Rocket;
  if (lowerTitle.includes("farm") || lowerTitle.includes("agri") || lowerTitle.includes("crop")) return Sprout;
  if (lowerTitle.includes("edu") || lowerTitle.includes("student") || lowerTitle.includes("scholarship")) return GraduationCap;
  if (lowerTitle.includes("health") || lowerTitle.includes("med") || lowerTitle.includes("care")) return HeartPulse;
  if (lowerTitle.includes("scheme") || lowerTitle.includes("policy") || lowerTitle.includes("gov")) return ShieldCheck;

  return Award;
};

interface DynamicSchemeProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SchemeDetailPage({ params }: DynamicSchemeProps) {
  const { slug } = await params;
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(slug);

  // 1. Try DB first (for Admin-added items)
  let schemeData: any = null;
  try {
    schemeData = await prisma.service.findFirst({
      where: {
        type: "SCHEME",
        OR: [{ slug: slug }, ...(isValidObjectId ? [{ id: slug }] : [])],
      },
    });
  } catch (err) {
    console.error("DB Fetch Error:", err);
  }

  // 2. Fallback to data.ts (for the default 3 schemes)
  if (!schemeData) {
    const localScheme = initialSchemes.find(
      (s) =>
        s.id.toString() === slug ||
        s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );
    if (localScheme) {
      schemeData = {
        title: localScheme.title,
        description: localScheme.description,
        amount: localScheme.amount,
        icon: localScheme.icon,
        bgColor: localScheme.bgColor,
      };
    }
  }

  if (!schemeData) notFound();

  const heroBgColor = schemeData.bgColor || "#EAF5EA";
  const heroIcon = schemeData.icon?.trim() || "";

  // Helper to safely render the icon without throwing Next/Image errors
  const renderHeroIcon = () => {
    if (heroIcon.startsWith("/") || heroIcon.startsWith("http://") || heroIcon.startsWith("https://")) {
      return (
        <Image 
          src={heroIcon} 
          alt={schemeData.title} 
          width={64} 
          height={64} 
          className="object-contain" 
        />
      );
    }

    const IconComponent = iconMap[heroIcon] || getMatchingIconByTitle(schemeData.title);
    return <IconComponent className="w-10 h-10 text-[#C2943A]" />;
  };

  return (
    <div className={`min-h-screen bg-white ${dmSans.className}`}>
      {/* ── HERO SECTION ── */}
      <section 
        id="hero-section" 
        className="relative overflow-hidden pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[560px] md:min-h-[560px] flex flex-col justify-start"
        style={{ backgroundColor: heroBgColor }}
      >
        <div className="max-w-[1440px] mx-auto w-full relative z-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-6 sm:mb-8 uppercase">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <Link href="/#hero-section" className="hover:text-zinc-900 transition-colors">Schemes</Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-zinc-900">{schemeData.title}</span>
          </nav>

          {/* Centered Logo & Card-Style Display */}
          <div className="reveal max-w-2xl flex flex-col items-start text-left">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 mb-6 border border-black/5">
              {renderHeroIcon()}
            </div>

            {schemeData.amount && (
              <div className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-800 mb-4 border border-black/5">
                {schemeData.amount}
              </div>
            )}

            <h1 className="text-[26px] xs:text-[30px] sm:text-[36px] md:text-[clamp(2rem,3.2vw,3.2rem)] leading-[1.2] md:leading-[1.05] tracking-[-0.04em] text-zinc-900 mb-4 font-medium">
              <span className="text-[#C2943A]">{schemeData.title}</span>
            </h1>
            <p className="text-[14px] sm:text-[16px] leading-[1.6] text-zinc-600 max-w-xl">
              {schemeData.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2ND SECTION: DETAILS & SIDEBAR ── */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Scheme Details</h2>
            <p className="text-zinc-700 text-lg leading-relaxed whitespace-pre-line mb-8">
              {schemeData.description}
            </p>
            <button className="bg-[#C2943A] hover:bg-[#a67c29] text-white px-5 py-4 rounded-xl font-bold transition-all shadow-md cursor-pointer">
              Apply for {schemeData.title}
            </button>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white text-zinc-900 border border-zinc-300 p-6 rounded-2xl sticky top-8 shadow-sm">
              <h3 className="text-xl font-bold border-b border-zinc-200 text-[#C2943A] mb-3 pb-2">Need Guidance?</h3>
              <p className="text-zinc-600 text-sm mb-6 mt-4">
                Talk to our expert consultants to understand the exact eligibility criteria and application steps for this scheme.
              </p>
              <button className="w-full bg-[#C2943A] hover:bg-[#a67c29] text-white py-3 px-6 rounded-xl font-semibold transition-all cursor-pointer">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </main>
      <ScrollToTopButton heroSectionId="hero-section" />
    </div>
  );
}