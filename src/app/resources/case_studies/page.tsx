"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Search,
  X,
  ArrowRight,
  ChevronRight,
  Info,
} from "lucide-react";
import '@/app/globals.css';

// ── LAZY LOADED SUB-COMPONENTS ──
const CaseStudyDetailModal = dynamic(
  () => import("@/components/blog&case_study/CasestudiesDetail"),
  { ssr: false }
);

const NewsletterCard = dynamic(
  () => import("@/components/blog&case_study/Rightsidecards").then((mod) => mod.NewsletterCard),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-zinc-100 rounded-2xl animate-pulse w-full mt-6" />
  }
);

const Interservices = dynamic(
  () => import("@/components/blog&case_study/Innerservices"),
  {
    ssr: false,
    loading: () => <div className="h-40 bg-zinc-50 animate-pulse w-full my-8" />
  }
);

const LoadMorePagination = dynamic(
  () => import("@/components/blog&case_study/loadmore"),
  { ssr: false }
);

const ScrollToTopButton = dynamic(
  () => import("@/components/scrollarrow/ScrollToTopButton"),
  { ssr: false }
);

// Interface for Case Study Structure
interface CaseStudy {
  id: string;
  title: string;
  category: string;
  location: string;
  excerpt: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: string;
  image: string;
  readTime?: string;
}

// Structured Case Studies Data
const caseStudiesData: CaseStudy[] = [
  {
    id: "finpay-innovators",
    title: "FinPay Innovators: 30-Day Fast-Track Registration & DPIIT Recognition",
    category: "Startup Registration",
    location: "Bangalore, KA",
    excerpt: "Navigating complex multi-director documentation and regulatory clearances to achieve Startup India recognition in record time.",
    challenge: "FinPay Innovators was building a payment gateway solution. They needed to qualify for the DPIIT certificate to secure capital gains tax exemptions and intellectual property fast-tracking. However, their internal registration attempts stalled due to intricate compliance clauses in their memorandum of association (MoA) and query responses required by corporate registry offices.",
    solution: "Arambh Advisory took over the registration process. We first restructured their MoA to fit startup qualification standards, then managed the complete application flow through the Startup India portal. We drafted a detailed innovation pitch deck explaining their proprietary API and handled direct queries from government assessors.",
    result: "Secured formal DPIIT registration in exactly 28 days. This allowed the startup to unlock patent application fast-tracking (80% rebate) and establish their trust accounts without standard bureaucratic delay.",
    metrics: "28-Day Approval",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mediconnect-grants",
    title: "MediConnect: Securing ₹2Cr in Government Funding & Grants",
    category: "Funding Support",
    location: "Pune, MH",
    excerpt: "Preparing complex financial models, project proposals, and pitch decks to qualify for national healthcare technology grants.",
    challenge: "MediConnect developed an AI-based rural diagnostic device. While their technology was sound, they lacked the specialized documentation, financial projections, and compliance audits required to pitch for high-value government grants like the Startup India Seed Fund Scheme (SISFS) and biotechnology grants.",
    solution: "Our advisory team restructured their financial models to show transparent unit economics and projected developmental impact in rural clinics. We compiled their technical audit reports and designed a compliance-optimized project report tailored to the evaluation committee's scoring parameters.",
    result: "Successfully presented and secured a total of ₹2 Crore under the seed fund and technology development programs, with the initial tranche disbursed within 45 days.",
    metrics: "₹2Cr Funding Secured",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "agrigrow-compliance",
    title: "AgriGrow: Streamlining Multi-State Compliance & Tax Restructuring",
    category: "Compliance & Advisory",
    location: "Nashik, MH",
    excerpt: "Optimizing supply chain contracts, state tax filings, and MSME interest subsidies to boost cash flow by 35%.",
    challenge: "AgriGrow was expanding its cold chain logistics across Maharashtra, Gujarat, and Madhya Pradesh. Managing decentralized state registrations, labor laws, and seasonal tax filings led to late compliance penalties and frozen credit balances.",
    solution: "Arambh Advisory consolidated their multi-state tax structure, set up a centralized compliance dashboard, and applied for MSME credit schemes.",
    result: "Resolved all pending state audit flags and established monthly reporting schedules, reducing compliance risk to zero.",
    metrics: "35% Cash Flow Boost",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ecocharge-subsidy",
    title: "EcoCharge: Navigating Subsidy Audits & Green Tech MSME Benefits",
    category: "MSME Benefits",
    location: "Ahmedabad, GJ",
    excerpt: "Unlocking collateral-free loans and state electricity duty exemptions for an expanding electric vehicle charging network.",
    challenge: "EcoCharge was scaling its network of charging stations but faced heavy initial capital requirements. They were unaware of specific state-level green energy subsidies and capital rebates available to MSMEs.",
    solution: "We registered EcoCharge under the MSME category, structured their project reports for the CGTMSE loan scheme (collateral-free), and submitted claims for local electricity duty exemptions.",
    result: "Secured ₹1.5 Crore collateral-free working capital loan and saved 15% in operational utility costs through green energy exemptions.",
    metrics: "₹1.5Cr Collateral Loan",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shopkart-restructuring",
    title: "ShopKART: Converting Sole Proprietorship to Private Limited with Multi-Founder Equity",
    category: "Startup Registration",
    location: "Mumbai, MH",
    excerpt: "Structuring co-founder shares, intellectual property transfers, and initial GST registrations for an online retail brand.",
    challenge: "The founder of ShopKART wanted to bring on co-founders and raise external capital, but the business was registered as a sole proprietorship, making equity distribution and outside investment legally impossible.",
    solution: "Arambh Advisory structured their corporate migration, incorporating them as a Private Limited company, drafting a robust Shareholder Agreement (SHA), and filing their new GST registrations.",
    result: "Successfully migrated all assets and IP to the new entity within 15 days, allowing the founders to close their first angel check immediately.",
    metrics: "Seamless Restructuring",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "learncore-governance",
    title: "LearnCore: Restructuring Corporate Governance for Series-A Readiness",
    category: "Business Consulting",
    location: "Gurgaon, HR",
    excerpt: "Conducting diagnostic compliance audits and cleaning up shareholder cap tables to prepare for venture capital investment.",
    challenge: "LearnCore had a term sheet from a major VC firm, but the investor's due diligence team flagged unfiled corporate returns, disorganized board minutes, and a messy cap table involving early freelance advisers.",
    solution: "Arambh Advisory conducted an intensive 3-week compliance cleanup, formalizing all historical board resolutions, correcting past filings, and structuring legal buyouts for early equity agreements.",
    result: "Cleared the due diligence report with zero critical flags, enabling the startup to close their Series-A funding on schedule.",
    metrics: "Series-A Compliant",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "logiroute-loans",
    title: "LogiRoute: Unlocking ₹75L Subsidized Loans via Udyam Benefits",
    category: "MSME Benefits",
    location: "Chennai, TN",
    excerpt: "Leveraging Udyam MSME status to secure lower interest rates and priority sector lending facilities for fleet expansion.",
    challenge: "LogiRoute needed to acquire 15 new delivery vans to fulfill a contract, but commercial vehicle interest rates from major banks were close to 13%, making the expansion financially unsustainable.",
    solution: "We registered LogiRoute under the Udyam portal, verified their eligibility for interest subvention schemes, and applied to priority sector lending departments.",
    result: "Secured fleet financing at a subsidized rate of 8.25%, saving the company over ₹12 Lakhs in interest payments over the loan tenure.",
    metrics: "4.75% Interest Savings",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cloudpos-crossborder",
    title: "CloudPOS: Setting Up Compliant Cross-Border SaaS Billing Structures",
    category: "Compliance & Advisory",
    location: "Hyderabad, TS",
    excerpt: "Establishing GST export procedures, transfer pricing compliance, and double-taxation relief strategies for global customers.",
    challenge: "CloudPOS was selling software subscriptions to clients in the US and Europe. They were facing issues with international payment compliance, double taxation on service exports, and unoptimized GST refund filings.",
    solution: "Arambh Advisory designed a compliant export invoicing workflow, filed their Letter of Undertaking (LUT) for zero-rated GST exports, and set up transfer pricing documentation.",
    result: "Unlocked monthly GST refunds on input tax credits and ensured 100% compliance with international billing guidelines.",
    metrics: "100% Tax Compliant",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
  }
];

// Most read case studies in sidebar
const popularCaseStudies = [
  { id: "finpay-innovators", title: "The 30-Day Fast-Track Registration & DPIIT Recognition", readTime: "7 min", category: "Startup Registration" },
  { id: "mediconnect-grants", title: "Securing ₹2Cr in Government Funding & Grants", readTime: "9 min", category: "Funding Support" },
  { id: "ecocharge-subsidy", title: "Navigating Subsidy Audits & Green Tech MSME Benefits", readTime: "5 min", category: "MSME Benefits" }
];

// Categories list for filtering
const categories = [
  "All Topics",
  "Startup Registration",
  "Funding Support",
  "MSME Benefits",
  "Compliance & Advisory",
  "Business Consulting"
];

export default function CaseStudies() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [visibleCount, setVisibleCount] = useState(4);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 300);
  };

  // Reference directly targeting the Cards Container Grid for auto-scroll
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Debouncing Search: Updates searchTerm only after user stops typing for 350ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchInput);
      setVisibleCount(4); // Reset pagination on search trigger
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  // Filtering Logic
  const filteredCaseStudies = useMemo(() => {
    return caseStudiesData.filter((study) => {
      const matchesSearch =
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.challenge.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === "All Topics" || activeCategory === "All Articles" || study.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(4);

    // Scroll down to bring the Cards Grid into view below the fixed header
    setTimeout(() => {
      if (cardsContainerRef.current) {
        const yOffset = -230; 
        const y = cardsContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.05,
      rootMargin: "0px 0px 120px 0px",
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const targetElements = document.querySelectorAll(".reveal, .rv-up, .txt-up");

    targetElements.forEach((el) => observer.observe(el));

    return () => {
      targetElements.forEach((el) => observer.unobserve(el));
    };
  }, [filteredCaseStudies, visibleCount, activeCategory]);

  const hasMore = filteredCaseStudies.length > visibleCount;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setEmailStatus("sending");
    setTimeout(() => {
      setEmailStatus("success");
      setEmailInput("");
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased flex flex-col justify-between relative">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-20 sm:pb-24 md:pb-32 px-6 sm:px-12 md:px-16 min-h-[560px] md:min-h-[560px] flex flex-col justify-start ">
        {/* Background Image Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/case_studies_hero.webp')" }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">
          {/* Breadcrumbs */}
          <nav 
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-6 sm:mb-8 uppercase txt-up" 
            aria-label="Breadcrumb"
          >
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-zinc-400">Resources</span>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">Case Studies</span>
          </nav>

          {/* Header Content */}
          <div className="reveal max-w-2xl flex flex-col items-start text-left">
            <h1 
              className="text-[26px] xs:text-[30px] sm:text-[36px] md:text-[clamp(2rem,3.2vw,3.2rem)] leading-[1.2] md:leading-[1.05] tracking-[-0.04em] text-white mb-4 txt-up txt-delay-1"
              style={{
                fontFamily: "DM sans",
                fontWeight: 500,
              }}
            >
              Accelerating Growth. <br />
              <span className="text-[#C2943A]">
                Real Startup Success.
              </span>
            </h1>
            <p 
              className="text-[14px] sm:text-[16px] leading-[1.6] text-zinc-300 max-w-xl txt-up txt-delay-2"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 400,
              }}
            >
              Explore how we guide startups and MSMEs through company registration, secure critical government grants, maximize taxation exemptions, and manage compliance audits to turn innovative visions into structured enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN CASE STUDY WORKSPACE ── */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-[1536px] mx-auto w-full">

        {/* Search Bar - Full width pill shaped input */}
        <div className="relative w-full mb-4">
          <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by topic, keyword, or question..."
            className="w-full bg-white text-zinc-900 placeholder-zinc-400 py-3 sm:py-3.5 pl-10 sm:pl-12 pr-10 sm:pr-12 rounded-full border border-zinc-300 focus:border-zinc-400 focus:outline-none text-sm sm:text-base transition-all shadow-xs"
          />
          {searchInput && (
            <button
              onClick={handleSearchClear}
              className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>

        {/* Sub-header Metadata Line */}
        <div className="text-xs sm:text-sm px-2 text-zinc-500 font-medium mb-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span>{filteredCaseStudies.length} articles</span>
          <span>•</span>
          <span>{categories.length - 1} categories</span>
          <span>•</span>
          <span>54 min total reading time</span>
        </div>

        {/* Filter Category Pills Row */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-1 sm:px-3 py-1 sm:py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-black text-white shadow-sm"
                  : "bg-white border border-zinc-300 text-zinc-800 hover:border-zinc-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MAIN GRID + SIDEBAR LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-14 xl:gap-20 items-start">

          {/* Main Grid Column - Targeted for Auto Scroll */}
          <div ref={cardsContainerRef} className="w-full flex flex-col">
            {filteredCaseStudies.length === 0 ? (
              <div className="text-center py-20 bg-[#F6F4F0] rounded-2xl border border-zinc-300 p-8">
                <Info className="w-12 h-12 text-[#BD8E32] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-zinc-800">No case studies found</h3>
                <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                  We couldn't find any case studies matching "{searchTerm}" under "{activeCategory}". Try clearing search keywords or choosing another category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    handleCategoryChange("All Topics");
                  }}
                  className="mt-6 px-6 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-full text-sm font-semibold transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* 2-Column Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCaseStudies.slice(0, visibleCount).map((study, idx) => (
                    <div
                      key={`${activeCategory}-${searchTerm}-${study.id}`}
                      className={`card-pop-up card-delay-${idx % 4} bg-white border border-zinc-300 rounded-[18px] overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 w-full`}
                    >
                      <div>
                        {/* 1. Image Container (Native Lazy Loaded Next Image) */}
                        <div className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden bg-zinc-100 rounded-t-[18px]">
                          <Image
                            src={study.image}
                            alt={study.title}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </div>

                        {/* 2. Card Body Area */}
                        <div className="p-4 sm:p-6 flex flex-col">
                          {/* Category Badge & Meta Line */}
                          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mb-3 w-full">
                            <span className="inline-block text-[11px] sm:text-[16px] font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[#BD8E32] shrink-0">
                              {study.category}
                            </span>
                            <span className="text-[11px] sm:text-[12px] text-zinc-900 font-medium shrink-0">
                              {study.location} • {study.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-DM sans text-lg font-bold text-zinc-900 leading-snug mb-2 line-clamp-2">
                            {study.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-DM sans text-m text-zinc-900 leading-relaxed line-clamp-3 font-normal mb-4">
                            {study.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* 3. Card Footer */}
                      <div className="px-2 sm:px-3 pb-5 sm:pb-6 pt-0 flex items-center gap-4 mt-auto w-full">
                        <div className="flex items-center gap-1.5">
                        </div>
                        <button
                          onClick={() => setSelectedCaseStudy(study)}
                          className="self-start inline-flex items-center text-s font-semibold text-[#BD8E32] transition-all duration-200 cursor-pointer shrink-0"
                        >
                          Read full Story <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>            
            )}
          </div>

          {/* Load More Pagination - Mobile */}
          <div className="block lg:hidden">
            <LoadMorePagination
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              isLoading={loading}
            />
          </div>
          {/* Load More Pagination - Mobile */}
          <div className="block lg:hidden">
            <LoadMorePagination
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              isLoading={loading}
            />
          </div>

          {/* Right Sidebar Area */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {/* 1. Most Read Box */}
            <div className="rv-up w-full bg-white border border-zinc-300 rounded-[16px] overflow-hidden shadow-xs">
              <div className="px-4 py-3 border-b border-zinc-300 flex items-center justify-between">
                <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-900">
                  Most Read
                </h3>
              </div>
              <div className="flex flex-col">
                {popularCaseStudies.map((pop, idx) => (
                  <div
                    key={pop.id}
                    onClick={() => {
                      const found = caseStudiesData.find((c) => c.id === pop.id);
                      if (found) setSelectedCaseStudy(found);
                    }}
                    className="p-3.5 border-b border-zinc-300 last:border-none flex gap-4 hover:bg-zinc-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xl font-extrabold text-[#BD8E32] leading-none shrink-0 w-5 mt-2">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 leading-snug hover:text-[#BD8E32] transition-colors mb-1 line-clamp-2">
                        {pop.title}
                      </h4>
                      <span className="text-[12px] font-medium text-zinc-800">
                        {pop.readTime} • {pop.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 & 3. Monthly Insights Newsletter */}
            <div className="lg:sticky lg:top-28 lg:self-start w-full">
              <NewsletterCard />   
            </div>        
          </aside>
        </div>

        {/* Load More Pagination - Desktop */}
        <div className="hidden lg:block">
          <LoadMorePagination
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            isLoading={loading}
          />
        </div>
      </section>

      {/* ── 3. INTERLINKS SECTION ── */}
      <Interservices />

      <CaseStudyDetailModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
      
      <ScrollToTopButton heroSectionId="hero-section" />  
    </div>
  );
}