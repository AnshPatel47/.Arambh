"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  X,
  ArrowRight,
  Briefcase,
  Landmark,
  CheckCircle2,
  ChevronRight,
  Award,
  Globe,
  TrendingUp,
  FileCheck,
  Building2,
  Users,
  Compass,
  FileText,
  Mail,
  Info,
  Clock
} from "lucide-react";

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
    date: "Feb 05, 2026",
    readTime: "7 min read",
    author: {
      name: "Arambh rial EditoTeam",
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
    date: "Jan 29, 2026",
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
    date: "Jan 18, 2026",
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
    date: "Dec 10, 2025",
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
    date: "Nov 22, 2025",
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
    date: "Oct 05, 2025",
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
  { id: 1, title: "Capital Gains Exemptions for Startups Under Section 54EE", category: "Taxation" },
  { id: 2, title: "A Complete Guide to Draft Shareholder Agreements", category: "Legal Structure" },
  { id: 3, title: "How to Answer Queries Raised by DPIIT Assessors", category: "Startup Schemes" }
];

// Categories list for filtering
const categories = [
  "All Articales",
  "Startup Registration",
  "Funding Support",
  "MSME Benefits",
  "Compliance & Advisory",
  "Business Consulting"
];

export default function ResourcesBlogPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articales");
  const [visibleCount, setVisibleCount] = useState(4);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailInput, setEmailInput] = useState("");

  // Debouncing Search: Updates searchTerm only after user stops typing for 350ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchInput);
      setVisibleCount(4); // Reset pagination on search trigger
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
        activeCategory === "All Articales" || post.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

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
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased flex flex-col justify-between">

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[520px] flex items-center">

        {/* Background Image Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/blog_hero.webp')" }}
        />

        {/* Dark Gradient Overlay (the "shadow") */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-DM sans font-semibold tracking-widest text-[#BD8E32] mb-6" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-zinc-400">Resources</span>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">Blog</span>
          </nav>

          <div className="max-w-2xl flex flex-col items-start text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-3">
              Insights & Guides. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BD8E32] to-[#f8d08b]">
                For Corporate Leaders.
              </span>
            </h1>
            <p className="text-1xl sm:text-1xl text-zinc-300 leading-relaxed max-w-xl">
              Expert research, legal frameworks, and policy updates designed to help Indian entrepreneurs structure their corporate compliance and leverage institutional benefits.
            </p>
          </div>

        </div>
      </section>

      {/* ── 2. MAIN BLOG WORKSPACE ── */}
      <section className="py-12 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto w-full flex-grow">

        {/* Header stats & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200 pb-6 mb-8 gap-4">
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 font-DM sans mb-2">All Articales</h2>
            <div className="relative w-full mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                placeholder="Search by topic, keyword, or question..."

                className="w-full bg-[#fafaf9] text-zinc-800 placeholder-zinc-400 py-3 pl-11 pr-10 rounded-xl border border-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#BD8E32]/20 text-DM sans transition-all mt-2 mb-2"
              />
              {searchInput && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="DM sans text-neutral-500 mt-2">
              Showing {filteredPosts.length} of {blogPostsData.length} published guides
            </p>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(4); // Reset pagination
              }}
              className={`px-4 py-2 text-DM sans sm:DM sans font-semibold rounded-3xl transition-all duration-200 border cursor-pointer ${activeCategory === cat
                ? "bg-black border-black text-white shadow-sm"
                : "bg-white border-zinc-300 text-zinc-900 hover:border-[#BD8E32] hover:text-[#BD8E32]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID + SIDEBAR LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Main Grid */}
          <div className="lg:col-span-8 flex flex-col">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-[#F6F4F0] rounded-3xl border border-zinc-150 p-8">
                <Info className="w-12 h-12 text-[#BD8E32] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-zinc-800">No articles found</h3>
                <p className="text-zinc-500 DM sans mt-2 max-w-md mx-auto">
                  We couldn't find any articles matching "{searchTerm}" under "{activeCategory}". Try clearing search keywords or choosing another category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All Articales");
                  }}
                  className="mt-6 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl DM sans font-semibold transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.slice(0, visibleCount).map((post) => (
                    <div
                      key={post.id}
                      className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md hover:scale-[1.01] hover:border-zinc-200/80 transition-all duration-300"
                    >
                      <div>
                        {/* Card Image */}
                        <div className="relative w-full aspect-[1.6/1] overflow-hidden bg-neutral-100">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 bg-black/75 text-[#BD8E32] text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-[#BD8E32]/30 backdrop-blur-sm">
                            {post.category}
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between text-DM sans text-zinc-400 font-medium mb-3">
                            <span>{post.date}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-zinc-400" /> {post.readTime}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-[#BD8E32] transition-colors mb-3">
                            {post.title}
                          </h3>

                          <p className="DM sans text-neutral-800 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Card Author Footer */}
                      <div className="px-6 py-4 border-t border-zinc-50 flex items-center justify-between bg-zinc-50/50">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                          />
                          <div>
                            <p className="text-DM sans font-bold text-neutral-800">{post.author.name}</p>
                            <p className="text-[10px] text-zinc-400 font-medium">{post.author.role}</p>
                          </div>
                        </div>
                        <a
                          href={`/resources/blogs/${post.id}`}
                          className="flex items-center gap-1 text-DM sans font-bold text-[#BD8E32] group-hover:translate-x-1 transition-transform"
                        >
                          Read Article <ArrowRight className="w-3.5 h-3.5 " />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {hasMore && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={loadMore}
                      className="px-6 py-3 rounded-3xl bg-[#fdfdfc] hover:bg-zinc-200/80 active:bg-zinc-300 text-zinc-950 font-bold DM sans border border-zinc-200 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 flex flex-col gap-6 ">

            {/* Most Read Articles block */}
            <div className="bg-white border border-zinc-300 rounded-3xl overflow-hidden shadow-sm">
              <div className="bg-[#fdfdfc] px-4 py-4 border-b border-zinc-250">
                <h3 className="DM sans font-bold uppercase tracking-widest text-[#764A04]">
                  Popular Guides
                </h3>
              </div>
              <div className="flex flex-col mt-0">
                {popularPosts.map((pop, idx) => (
                  <div
                    key={pop.id}
                    className="p-5 border-b border-zinc-300 last:border-none flex gap-4 hover:bg-zinc-50 transition-colors cursor-pointer mt-0 mb-0"
                  >
                    <span className="text-2xl font-black text-[#b98723] leading-none mt-3 mb-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-[#cc9a36] uppercase tracking-wider mt-0">
                        {pop.category}
                      </span>
                      <h4 className="text-DM sans font-semibold text-zinc-800 leading-snug hover:text-[#BD8E32] transition-colors mt-0 mb-0">
                        {pop.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-8 flex flex-col gap-6">
              {/* Newsletter Subscription */}
              <div className="bg-[#1a1919] rounded-3xl p-6 border border-zinc-300 text-zinc-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#BD8E32]/10 rounded-full blur-2xl" />
                {/* <Mail className="w-8 h-8 text-[#BD8E32] mb-4" /> */}
                <h3 className="text-lg font-semibold font-DM text-zinc-200 ">Monthly Insights</h3>
                <p className="text-DM sans text-zinc-300 mt-2 leading-relaxed mb-4">
                  Receive curated articles on regulatory mandates, government schemes, and financial planning for Indian startups.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="your@email.com "
                    required
                    className="w-full bg-white/10 text-white placeholder-zinc-600 py-2.5 px-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#BD8E32] text-DM sans transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === "sending"}
                    className="w-full bg-[#BD8E32] hover:bg-[#764A04] text-white py-2.5 rounded-xl font-semibold text-DM sans transition-all cursor-pointer"
                  >
                    {emailStatus === "sending" ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>
                {emailStatus === "success" && (
                  <p className="text-[#BD8E32] text-DM sans font-semibold text-center mt-3">
                    Thank you! You have subscribed successfully.
                  </p>
                )}
              </div>

              {/* Quick Offering Services Links */}
              <div className="bg-[#fafaf9] rounded-3xl p-6 border border-zinc-150">
                <h3 className="DM sans font-bold uppercase tracking-widest text-[#764A04] border-b border-zinc-200 pb-3 mb-4">
                  Core Offerings
                </h3>
                <div className="flex flex-col gap-1">
                  <a href="/services/startup" className="flex items-center justify-between p-3 rounded-xl hover:bg-white DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                    <span>Startup Registration</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </a>
                  <a href="/services/dpiit" className="flex items-center justify-between p-3 rounded-xl hover:bg-white DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                    <span>DPIIT Recognition</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </a>
                  <a href="/services/msme" className="flex items-center justify-between p-3 rounded-xl hover:bg-white DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                    <span>MSME Registration</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </a>
                  <a href="/services/funding" className="flex items-center justify-between p-3 rounded-xl hover:bg-white DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                    <span>Funding Support</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </a>
                  <a href="/services/compliance" className="flex items-center justify-between p-3 rounded-xl hover:bg-white DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                    <span>Compliance & Audit</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ── 3. INTERLINKS SECTION ── */}
      <section className="bg-zinc-50 py-16 px-6 sm:px-12 md:px-16 border-t border-zinc-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold font-DM text-neutral-900">How We Can Help You Succeed</h2>
            <p className="DM sans text-neutral-500 mt-2">Explore the primary advisory solutions featured in the articles above.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-zinc-150 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#BD8E32] flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest mb-0">Growth Engine</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-2 mb-2">DPIIT & Startup India</h4>
                <p className="text-DM sans sm:DM sans text-neutral-500 leading-relaxed mb-3">
                  Set up your business to secure major taxation exemptions, seed grants, intellectual property rebates, and self-compliance benefits.
                </p>
              </div>
              <a href="/services/dpiit" className="flex items-center gap-2 text-DM sans font-bold text-neutral-800 hover:text-[#BD8E32] transition-colors pt-4 border-t border-zinc-700">
                Explore DPIIT Benefits <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white border border-zinc-150 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#BD8E32] flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest mb-0">Financial Fuel</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-2 mb-3">Government Funding</h4>
                <p className="text-DM sans sm:DM sans text-neutral-500 leading-relaxed mb-3">
                  Navigate state seed funds, priority financing schemes, and interest subsidies with expert audits and optimized project proposals.
                </p>
              </div>
              <a href="/services/funding" className="flex items-center gap-2 text-DM sans font-bold text-neutral-800 hover:text-[#BD8E32] transition-colors pt-4 border-t border-zinc-700">
                Explore Funding Options <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white border border-zinc-150 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 mb-0">
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#BD8E32] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest mb-0">Operational Guard</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-2 mb-3">Corporate Advisory</h4>
                <p className="text-DM sans sm:DM sans text-neutral-500 leading-relaxed mb-3">
                  Maintain immaculate corporate logs, clean cap tables, monthly tax filings, and full regulatory conformity to stay investor-ready.
                </p>
              </div>
              <a href="/services/compliance" className="flex items-center gap-2 text-DM sans font-bold text-neutral-800 hover:text-[#BD8E32] transition-colors pt-4 border-t border-zinc-700">
                Explore Compliance Services <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
