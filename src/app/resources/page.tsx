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
  Clock,
} from "lucide-react";
import '@/app/globals.css';

// ── LAZY LOADED SUB-COMPONENTS (Code-split to reduce compilation & bundle size) ──
const BlogDetailModal = dynamic(
  () => import("../components/blog&case_study/BlogDetail"),
  { ssr: false }
);

const NewsletterCard = dynamic(
  () => import("@/app/components/blog&case_study/Rightsidecards").then((mod) => mod.NewsletterCard),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-zinc-100 rounded-2xl animate-pulse w-full mt-6" />
  }
);

const Interservices = dynamic(
  () => import("../components/blog&case_study/Innerservices"),
  {
    ssr: false,
    loading: () => <div className="h-40 bg-zinc-50 animate-pulse w-full my-8" />
  }
);

const LoadMorePagination = dynamic(
  () => import("@/app/components/blog&case_study/loadmore"),
  { ssr: false }
);

const ScrollToTopButton = dynamic(
  () => import("../../components/scrollarrow/ScrollToTopButton"),
  { ssr: false }
);

// Interface for Blog Post Structure
interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
}

// Blog Posts Data
const blogPostsData: BlogPost[] = [
  {
    id: "how-to-register-startup-india",
    title: "How to Register Your Startup in India: The Definitive Step-by-Step Guide",
    category: "Startup Registration",
    excerpt: "A complete walkthrough of incorporating a Private Limited or LLP company, structuring founder equity, and qualifying for DPIIT recognition.",
    content: "Registering a startup in India involves key decisions about corporate structure, share capital, and director credentials. This article guides you from choosing between a Private Limited Company and an LLP to filing name approvals on the MCA portal, drafting the Memorandum of Association (MoA), obtaining GSTIN, and preparing the validation pitch deck required to unlock Startup India benefits.",
    date: "July 2026",
    readTime: "7 min read",
    author: {
      name: "Arambh Editorial Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Corporate Advisory Group"
    },
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
    author: {
      name: "Vikas Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Senior Consultant, Funding"
    },
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
    author: {
      name: "Nisha Sharma",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Legal & Compliance Partner"
    },
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
    author: {
      name: "Arambh Editorial Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Corporate Advisory Group"
    },
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
    author: {
      name: "Rajesh Mehta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Director, MSME Relations"
    },
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
    author: {
      name: "Siddharth Rao",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
      role: "Taxation Partner"
    },
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
  }
];

// Most read articles in sidebar
const popularPosts = [
  { id: "how-to-register-startup-india", title: "How to Register Your Startup in India: The Definitive Guide", category: "Startup Registration", readTime: "7 min" },
  { id: "top-government-funding-schemes", title: "Top Government Funding Schemes Indian Founders Should Leverage in 2026", category: "Funding Support", readTime: "9 min" },
  { id: "corporate-governance-mistakes", title: "5 Corporate Governance Mistakes That Can Kill Your Series-A", category: "Business Consulting", readTime: "6 min" },
  { id: "dpiit-recognition-benefits", title: "DPIIT Recognition Benefits: Beyond Capital Gains Tax Exemptions", category: "Startup Registration", readTime: "5 min" }
];

// Categories list for filtering
const categories = [
  "All Articles",
  "Startup Registration",
  "Funding Support",
  "MSME Benefits",
  "Compliance & Advisory",
  "Business Consulting"
];

export default function ResourcesBlogPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [visibleCount, setVisibleCount] = useState(4);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 300);
  };

  // Reference directly targeting the Cards Container Grid
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Debouncing Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchInput);
      setVisibleCount(4);
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  // Filtering Logic
  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === "All Articles" || post.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  // Handle Category Filter Switch with Smooth Scroll directly to Cards Grid
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(4);

    // Scroll down to bring the Cards Grid into view so the user sees the filtered cards pop up
    setTimeout(() => {
      if (cardsContainerRef.current) {
        const yOffset = -240;
        const y = cardsContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  // IntersectionObserver for Scroll-Reveal Animations
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
  }, [filteredPosts, visibleCount, activeCategory]);

  const hasMore = filteredPosts.length > visibleCount;

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

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased flex flex-col justify-between relative">

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[560px] md:min-h-[560px] flex flex-col justify-start ">
        {/* Background Image Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/services_hero.webp')" }}
        />

  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">
          {/* Breadcrumbs matching PageHeroHeader spacing */}
          <nav 
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#C2943A] mb-6 sm:mb-8 uppercase txt-up" 
            aria-label="Breadcrumb"
          >
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-zinc-400">Resources</span>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">Blog</span>
          </nav>

          {/* Header Content matching PageHeroHeader typography */}
          <div className="reveal max-w-2xl flex flex-col items-start text-left">
            <h1 
              className="text-[26px] xs:text-[30px] sm:text-[36px] md:text-[clamp(2rem,3.2vw,3.2rem)] leading-[1.2] md:leading-[1.05] tracking-[-0.04em] text-white mb-4 txt-up txt-delay-1"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 500,
              }}
            >
              Insights &amp; Guides. <br />
              <span className="text-[#C2943A]">
                For Corporate Leaders.
              </span>
            </h1>
            <p 
              className="text-[14px] sm:text-[16px] leading-[1.6] text-zinc-300 max-w-xl txt-up txt-delay-2"
              style={{
                fontFamily: "var(--font-dm), sans-serif",
                fontWeight: 400,
              }}
            >
              Expert research, legal frameworks, and policy updates designed to help Indian entrepreneurs structure their corporate compliance and leverage institutional benefits.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN CONTENT SECTION ── */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-8 max-w-[1536px] mx-auto w-full flex-grow font-sans">

        {/* Search Bar */}
        <div className="relative w-full mb-4 txt-up txt-delay-1">
          <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-zinc-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />          
          </span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by topic, keyword, or question..."
            className="w-full bg-white text-zinc-900 placeholder-zinc-400 py-3.5 pl-12 pr-12 rounded-full border border-zinc-300 focus:border-zinc-400 focus:outline-none text-base transition-all shadow-xs"
          />
          {searchInput && (
            <button
              onClick={handleSearchClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Sub-header Metadata Line */}
        <div className="text-[12px] sm:text-sm text-DM sans px-2 text-zinc-500 font-medium mb-4 flex items-center gap-2 txt-up txt-delay-2">
          <span>{filteredPosts.length} articles</span>
          <span>•</span>
          <span>{categories.length - 1} categories</span>
          <span>•</span>
          <span>42 min total reading time</span>
        </div>

        {/* Filter Category Pills Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4 txt-up txt-delay-3">
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-18 xl:gap-20 items-start">
          {/* Main Grid Column - Targeted for Auto Scroll */}
          <div ref={cardsContainerRef} className="w-full flex flex-col">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-[#F6F4F0] rounded-2xl border border-zinc-300 p-8">
                <Info className="w-12 h-12 text-[#BD8E32] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-zinc-800">No articles found</h3>
                <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                  We couldn't find any articles matching "{searchTerm}" under "{activeCategory}". Try clearing search keywords or choosing another category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    handleCategoryChange("All Articles");
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
                  {filteredPosts.slice(0, visibleCount).map((post, idx) => (
                    <div
                      key={`${activeCategory}-${searchTerm}-${post.id}`}
                      className={`card-pop-up card-delay-${idx % 4} bg-white border border-zinc-300 rounded-[18px] overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full`}
                    >
                      <div>
                        {/* 1. Image Container (Native Lazy Loaded Next Image) */}
                        <div className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden bg-zinc-100 rounded-t-[18px]">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </div>

                        {/* 2. Card Body Area */}
                        <div className="p-5 sm:p-6 flex flex-col">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-block text-[12px] font-semibold px-3 py-1 rounded-full bg-[#F2E6CE] text-[#91671B]">
                              {post.category}
                            </span>
                            <span className="text-[12px] text-zinc-400 font-medium">
                              {post.date}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold text-zinc-900 leading-snug mb-2 line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt Description */}
                          <p className="text-m text-zinc-900 leading-relaxed line-clamp-3 font-normal mb-4">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* 3. Card Footer */}
                      <div className="px-5 sm:px-6 pb-6 pt-0 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-zinc-300">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              fill
                              loading="lazy"
                              className="object-cover"
                              sizes="28px"
                            />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-zinc-800">{post.author.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-zinc-900 font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-zinc-900" /> {post.readTime}
                          </span>
                          <button
                            onClick={() => setSelectedBlog(post)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border border-[#BD8E32] text-[#BD8E32] hover:bg-[#BD8E32] hover:text-white transition-all duration-200 cursor-pointer"
                          >
                            Read Article <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
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

          {/* Right Sidebar Area */}
          <aside className="lg:sticky lg:top-28 lg:self-start mt-0">
            
            {/* 1. Most Read Box (Scrolls away naturally as you scroll down) */}
            <div className="rv-up w-full bg-white border border-zinc-300 rounded-[16px] overflow-hidden shadow-xs antialiased [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]">
              <div className="px-4 py-3 border-b border-zinc-300 flex items-center justify-between">
                <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-900">
                  Most Read
                </h3>
              </div>
              <div className="flex flex-col">
                {popularPosts.map((pop, idx) => (
                  <div
                    key={pop.id}
                    onClick={() => {
                      const found = blogPostsData.find((c) => c.id === pop.id);
                      if (found) setSelectedBlog(found);
                    }}
                    className="p-3.5 border-b border-zinc-300 last:border-none flex gap-4 hover:bg-zinc-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xl font-extrabold text-[#BD8E32] leading-none shrink-0 w-5 mt-1">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 leading-snug hover:text-[#BD8E32] transition-colors mb-1 line-clamp-4">
                        {pop.title}
                      </h4>
                      <span className="text-[13px] font-medium text-zinc-900">
                        {pop.readTime} • {pop.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 & 3. Sticky Container: Only Monthly Insights + Core Offerings */}
            <div className="lg:sticky text-DM sans antialiased lg:top-28 lg:self-start w-full overflow-hidden">
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
      <div className="antialiased [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]">
      <Interservices />
      </div>
      <BlogDetailModal
        post={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      /> 

      <section id="hero-section" className="hidden"></section>
      <ScrollToTopButton heroSectionId="hero-section" />
    </div>
  );
}