"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  X,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  TrendingUp,
  FileText,
  Info,
  Clock,
  ArrowDown
} from "lucide-react";
import ScrollToTopButton from "../../components/scrollarrow/ScrollToTopButton";
import PageHeroHeader from "@/components/PageHeroHeader"; 
import '@/app/globals.css';

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
        const yOffset = -90; // Leave comfortable space above for search/filter pills
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
        {/* Section Title */}
        {/* <div className="reveal w-full mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-900 tracking-tight pb-3 sm:pb-4 border-b border-zinc-300 txt-up">
            All Articles
          </h2>
        </div> */}

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
        <div className="flex flex-wrap items-center gap-2.5 mb-8 txt-up txt-delay-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
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
                        {/* 1. Image Container */}
                        <div className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden bg-zinc-100 rounded-t-[18px]">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
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
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-7 h-7 rounded-full object-cover border border-zinc-300"
                          />
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

                {/* Mobile-Only Pagination (Renders immediately after category cards) */}
                {hasMore && (
                  <div className="w-full border-t border-zinc-300 mt-8 pt-6 flex justify-center lg:hidden">
                    <button
                      onClick={loadMore}
                      className="px-9 py-3 rounded-full bg-white hover:border-[#BD8E32] hover:text-[#BD8E32] text-zinc-900 font-semibold text-sm border border-zinc-300 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      Load More Articles <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Sidebar Area */}
          <div className="w-full lg:max-w-[320px] flex flex-col gap-5">
            <div className="lg:sticky lg:top-8 flex flex-col gap-5 w-full relative">
              {/* 1. Most Read Box */}
              <div className="rv-up bg-white border border-zinc-300 rounded-[16px] overflow-hidden shadow-xs relative">
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

              {/* 2. Monthly Insights Newsletter */}
              <div className="rv-up bg-white rounded-[16px] p-4 border border-zinc-300 shadow-xs relative overflow-hidden mb-3">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#BD8E32]/10 rounded-full blur-xl" />
                <h3 className="text-xl font-bold text-zinc-900 border-b border-zinc-300 pb-2 mb-2.5">Monthly Insights</h3>
                <p className="text-[14px] text-zinc-900 mt-1 leading-relaxed mb-3">
                  Receive curated articles on regulatory mandates, government schemes, and financial planning for Indian startups.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-zinc-100 text-zinc-900 placeholder-zinc-400 py-2 px-3 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#BD8E32] text-xs transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === "sending"}
                    className="w-full bg-[#BD8E32] hover:bg-[#764A04] text-white py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer"
                  >
                    {emailStatus === "sending" ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>
                {emailStatus === "success" && (
                  <p className="text-[#BD8E32] text-xs font-semibold text-center mt-2">
                    Thank you! You have subscribed successfully.
                  </p>
                )}
              </div>

              {/* 3. Core Offerings Links */}
              <div className="rv-up bg-white rounded-[16px] p-4 border border-zinc-300 shadow-xs">
                <h3 className="font-bold uppercase tracking-wider text-zinc-900 text-[16px] border-b border-zinc-300 pb-2 mb-2.5">
                  Core Offerings
                </h3>
                <div className="flex flex-col gap-0.5">
                  <a href="/services/startup" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-m font-medium text-zinc-800 hover:text-[#C2943A] transition-all">
                    <span>Startup Registration</span> <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                  </a>
                  <a href="/services/dpiit" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-m font-medium text-zinc-800 hover:text-[#C2943A] transition-all">
                    <span>DPIIT Recognition</span> <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                  </a>
                  <a href="/services/msme" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-m font-medium text-zinc-800 hover:text-[#C2943A] transition-all">
                    <span>MSME Registration</span> <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                  </a>
                  <a href="/services/funding" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-m font-medium text-zinc-800 hover:text-[#C2943A] transition-all">
                    <span>Funding Support</span> <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                  </a>
                  <a href="/services/compliance" className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-m font-medium text-zinc-800 hover:text-[#C2943A] transition-all">
                    <span>Compliance & Audit</span> <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop-Only Pagination (Hidden on mobile) */}
        {hasMore && (
          <div className="w-full border-t border-zinc-300 mt-12 pt-8 justify-center hidden lg:flex">
            <button
              onClick={loadMore}
              className="px-9 py-3 rounded-full bg-white hover:border-[#BD8E32] hover:text-[#BD8E32] text-zinc-900 font-semibold text-sm border border-zinc-300 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              Load More Articles <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ── 3. INTERLINKS SECTION ── */}
      <section className="bg-white pt-12 pb-6 sm:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="reveal mb-10 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 txt-up">How We Can Help You Succeed</h2>
            <p className="text-zinc-900 text-m mt-2 txt-up txt-delay-1">Explore the primary advisory solutions featured in the articles above.</p>
            <div className="w-full border-t border-zinc-300 mt-7 pt-0 flex justify-center mb-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div 
              className="rv-up bg-white border border-zinc-300 p-8 rounded-3xl shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
              style={{ transitionDelay: "100ms" }}
            >
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#C2943A] flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest mb-0">Growth Engine</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-0 mb-2">DPIIT & Startup India</h4>
                <p className="text-m text-zinc-900 leading-relaxed mb-3">
                  Set up your business to secure major taxation exemptions, seed grants, intellectual property rebates, and self-compliance benefits.
                </p>
              </div>
              <a href="/services/dpiit" className="flex items-center gap-2 text-m font-bold text-[#BD8E32] transition-colors pt-4 border-t border-zinc-300">
                Explore DPIIT Benefits <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 2 */}
            <div 
              className="rv-up bg-white border border-zinc-300 p-8 rounded-3xl shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
              style={{ transitionDelay: "200ms" }}
            >
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#BD8E32] flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest mb-0">Financial Fuel</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-0 mb-2">Government Funding</h4>
                <p className="text-m text-zinc-900 leading-relaxed mb-3">
                  Navigate state seed funds, priority financing schemes, and interest subsidies with expert audits and optimized project proposals.
                </p>
              </div>
              <a href="/services/funding" className="flex items-center gap-2 text-m font-bold text-[#BD8E32] transition-colors pt-4 border-t border-zinc-300">
                Explore Funding Options <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3 */}
            <div 
              className="rv-up bg-white border border-zinc-300 p-8 rounded-3xl shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 mb-0"
              style={{ transitionDelay: "300ms" }}
            >
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#C2943A] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest mb-0">Operational Guard</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-0 mb-2">Corporate Advisory</h4>
                <p className="text-m text-zinc-900 leading-relaxed mb-3">
                  Maintain immaculate corporate logs, clean cap tables, monthly tax filings, and full regulatory conformity to stay investor-ready.
                </p>
              </div>
              <a href="/services/compliance" className="flex items-center gap-2 text-m font-bold text-[#BD8E32] transition-colors pt-4 border-t border-zinc-300">
                Explore Compliance Services <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedBlog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md transition-opacity">

    {/* Modal Card Container */}
    <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col border border-zinc-900/50 max-h-[85vh] mt-12">

      {/* Header Image Band */}
      <div className="relative w-full h-[250px] sm:h-[220px] bg-neutral-100 flex-shrink-0">
        <img
          src={selectedBlog.image}
          alt={selectedBlog.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Close Button */}
        <button
          onClick={() => setSelectedBlog(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 text-white hover:bg-white hover:text-black p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header Content */}
        <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 pr-10 sm:pr-6 text-white">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#BD8E32] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2">
            <span>{selectedBlog.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32] text-[8px] sm:text-[12px]" />
            {/* <span className="text-zinc-300 text-DM sanstext-[8px] sm:text-[12px]">{selectedBlog.readTime} read</span> */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" />
            <span className="text-zinc-300 text-[10px] sm:text-[12px] text-DM sans">{selectedBlog.date}</span>
          </div>
          <h3 className="text-[12px] sm:text-[22px] text-DM sans font-semibold tracking-tight line-clamp-2">
            {selectedBlog.title}
          </h3>
        </div>
      </div>

      {/* Scrollable Blog Body */}
      <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 text-neutral-800">

        {/* Author / Meta Strip */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-300">
          <div className="flex items-center gap-3">
            {selectedBlog.author.avatar ? (
              <img
                src={selectedBlog.author.avatar}
                alt={selectedBlog.author.name}
                className="w-9 h-9 rounded-full object-cover border border-zinc-300"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#BD8E32]/20 text-[#BD8E32] font-bold flex items-center justify-center text-sm">
                {selectedBlog.author.name?.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-900 leading-tight">
                {selectedBlog.author.name}
              </p>
              <p className="text-[13px] text-zinc-700">{selectedBlog.author.role || "Author"}</p>
            </div>
          </div>
        </div>

        {/* Key Takeaways / TL;DR Box */}
        {selectedBlog.title && (
          <div className="bg-[#F6F4F0] border-l-4 border-[#BD8E32] p-3.5 sm:p-4 rounded-r-xl flex items-start gap-3 sm:gap-4">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" /> 
              <h4 className="font-bold uppercase tracking-wider text-DM sans text-[10px] sm:text-[14px] text-[#764A04] mt-1">
                title
              </h4>
              <p className="font-[12px] text-zinc-900 text-DM sans text-xs mt-1 leading-relaxed">
                {selectedBlog.title}
              </p>
            </div>
           
        )}

        {/* Blog Article Content */}
        <div className="space-y-4 text-xs sm:text-base text-zinc-900 leading-relaxed font-sans">
          {/* Main excerpt / content */}
          <h4 className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-zinc-900 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" />
               content
          </h4>
          {selectedBlog.content && (
            <p className="text-zinc-900 tDM sans border-zinc-300">
              {selectedBlog.content}
            </p>
          )}

          {/* Body content */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-zinc-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" />
              Article Overview
            </h4>
            <p>{selectedBlog.excerpt}</p>
          </div>
        </div>

        {/* category Section */}
        {/* {selectedBlog?.category && (
           <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-neutral-100 text-zinc-900 border border-zinc-400 mt-3">
               #{selectedBlog.category}
            </span>
         )} */}

      </div>

    </div>
  </div>
)}
 <section id="hero-section" className="hidden"></section>
  <ScrollToTopButton heroSectionId="hero-section" />
  <section className="w-full bg-white text-zinc-900 pt-0 pb-0 sm:pt-12 sm:pb-32 md:pb-20 relative z-0"></section>
    </div>
  );
}