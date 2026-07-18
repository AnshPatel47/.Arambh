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
  Info
} from "lucide-react";
import logo from "../../../../public/assets/images/logo1.png";

// Interface for Case Study Structure
interface CaseStudy {
  id: string;
  title: string;
  category: string;
  // industry: string;
  location: string;
  excerpt: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: string;
  image: string;
}

// Structured Case Studies Data
const caseStudiesData: CaseStudy[] = [
  {
    id: "finpay-innovators",
    title: "FinPay Innovators: 30-Day Fast-Track Registration & DPIIT Recognition",
    category: "Startup Registration",
    // industry: "FinTech",
    location: "Bangalore, KA",
    excerpt: "Navigating complex multi-director documentation and regulatory clearances to achieve Startup India recognition in record time.",
    challenge: "FinPay Innovators was building a payment gateway solution. They needed to qualify for the DPIIT certificate to secure capital gains tax exemptions and intellectual property fast-tracking. However, their internal registration attempts stalled due to intricate compliance clauses in their memorandum of association (MoA) and query responses required by corporate registry offices.",
    solution: "Arambh Advisory took over the registration process. We first restructured their MoA to fit startup qualification standards, then managed the complete application flow through the Startup India portal. We drafted a detailed innovation pitch deck explaining their proprietary API and handled direct queries from government assessors.",
    result: "Secured formal DPIIT registration in exactly 28 days. This allowed the startup to unlock patent application fast-tracking (80% rebate) and establish their trust accounts without standard bureaucratic delay.",
    metrics: "28-Day Approval",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mediconnect-grants",
    title: "MediConnect: Securing ₹2Cr in Government Funding & Grants",
    category: "Funding Support",
    // industry: "HealthTech",
    location: "Pune, MH",
    excerpt: "Preparing complex financial models, project proposals, and pitch decks to qualify for national healthcare technology grants.",
    challenge: "MediConnect developed an AI-based rural diagnostic device. While their technology was sound, they lacked the specialized documentation, financial projections, and compliance audits required to pitch for high-value government grants like the Startup India Seed Fund Scheme (SISFS) and biotechnology grants.",
    solution: "Our advisory team restructured their financial models to show transparent unit economics and projected developmental impact in rural clinics. We compiled their technical audit reports and designed a compliance-optimized project report tailored to the evaluation committee's scoring parameters.",
    result: "Successfully presented and secured a total of ₹2 Crore under the seed fund and technology development programs, with the initial tranche disbursed within 45 days.",
    metrics: "₹2Cr Funding Secured",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "agrigrow-compliance",
    title: "AgriGrow: Streamlining Multi-State Compliance & Tax Restructuring",
    category: "Compliance & Advisory",
    // industry: "AgriTech",
    location: "Nashik, MH",
    excerpt: "Optimizing supply chain contracts, state tax filings, and MSME interest subsidies to boost cash flow by 35%.",
    challenge: "AgriGrow was expanding its cold chain logistics across Maharashtra, Gujarat, and Madhya Pradesh. Managing decentralized state registrations, labor laws, and seasonal tax filings led to late compliance penalties and frozen credit balances.",
    solution: "Arambh Advisory consolidated their multi-state tax structure, set up a centralized compliance dashboard, and applied for MSME credit schemes.",
    result: "Resolved all pending state audit flags and established monthly reporting schedules, reducing compliance risk to zero.",
    metrics: "35% Cash Flow Boost",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ecocharge-subsidy",
    title: "EcoCharge: Navigating Subsidy Audits & Green Tech MSME Benefits",
    category: "MSME Benefits",
    // industry: "CleanTech",
    location: "Ahmedabad, GJ",
    excerpt: "Unlocking collateral-free loans and state electricity duty exemptions for an expanding electric vehicle charging network.",
    challenge: "EcoCharge was scaling its network of charging stations but faced heavy initial capital requirements. They were unaware of specific state-level green energy subsidies and capital rebates available to MSMEs.",
    solution: "We registered EcoCharge under the MSME category, structured their project reports for the CGTMSE loan scheme (collateral-free), and submitted claims for local electricity duty exemptions.",
    result: "Secured ₹1.5 Crore collateral-free working capital loan and saved 15% in operational utility costs through green energy exemptions.",
    metrics: "₹1.5Cr Collateral Loan",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shopkart-restructuring",
    title: "ShopKART: Converting Sole Proprietorship to Private Limited with Multi-Founder Equity",
    category: "Startup Registration",
    // industry: "E-commerce",
    location: "Mumbai, MH",
    excerpt: "Structuring co-founder shares, intellectual property transfers, and initial GST registrations for an online retail brand.",
    challenge: "The founder of ShopKART wanted to bring on co-founders and raise external capital, but the business was registered as a sole proprietorship, making equity distribution and outside investment legally impossible.",
    solution: "Arambh Advisory structured their corporate migration, incorporating them as a Private Limited company, drafting a robust Shareholder Agreement (SHA), and filing their new GST registrations.",
    result: "Successfully migrated all assets and IP to the new entity within 15 days, allowing the founders to close their first angel check immediately.",
    metrics: "Seamless Restructuring",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "learncore-governance",
    title: "LearnCore: Restructuring Corporate Governance for Series-A Readiness",
    category: "Business Consulting",
    // industry: "EdTech",
    location: "Gurgaon, HR",
    excerpt: "Conducting diagnostic compliance audits and cleaning up shareholder cap tables to prepare for venture capital investment.",
    challenge: "LearnCore had a term sheet from a major VC firm, but the investor's due diligence team flagged unfiled corporate returns, disorganized board minutes, and a messy cap table involving early freelance advisers.",
    solution: "Arambh Advisory conducted an intensive 3-week compliance cleanup, formalizing all historical board resolutions, correcting past filings, and structuring legal buyouts for early equity agreements.",
    result: "Cleared the due diligence report with zero critical flags, enabling the startup to close their Series-A funding on schedule.",
    metrics: "Series-A Compliant",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "logiroute-loans",
    title: "LogiRoute: Unlocking ₹75L Subsidized Loans via Udyam Benefits",
    category: "MSME Benefits",
    // industry: "Logistics",
    location: "Chennai, TN",
    excerpt: "Leveraging Udyam MSME status to secure lower interest rates and priority sector lending facilities for fleet expansion.",
    challenge: "LogiRoute needed to acquire 15 new delivery vans to fulfill a contract, but commercial vehicle interest rates from major banks were close to 13%, making the expansion financially unsustainable.",
    solution: "We registered LogiRoute under the Udyam portal, verified their eligibility for interest subvention schemes, and applied to priority sector lending departments.",
    result: "Secured fleet financing at a subsidized rate of 8.25%, saving the company over ₹12 Lakhs in interest payments over the loan tenure.",
    metrics: "4.75% Interest Savings",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cloudpos-crossborder",
    title: "CloudPOS: Setting Up Compliant Cross-Border SaaS Billing Structures",
    category: "Compliance & Advisory",
    // industry: "SaaS",
    location: "Hyderabad, TS",
    excerpt: "Establishing GST export procedures, transfer pricing compliance, and double-taxation relief strategies for global customers.",
    challenge: "CloudPOS was selling software subscriptions to clients in the US and Europe. They were facing issues with international payment compliance, double taxation on service exports, and unoptimized GST refund filings.",
    solution: "Arambh Advisory designed a compliant export invoicing workflow, filed their Letter of Undertaking (LUT) for zero-rated GST exports, and set up transfer pricing documentation.",
    result: "Unlocked monthly GST refunds on input tax credits and ensured 100% compliance with international billing guidelines.",
    metrics: "100% Tax Compliant",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
  }
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

export default function CaseStudies() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articales");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
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
  const filteredCaseStudies = useMemo(() => {
    return caseStudiesData.filter((study) => {
      const matchesSearch =
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // study.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === "All Articales" || study.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

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

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800 antialiased flex flex-col justify-between">

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[520px] flex items-center">

        {/* Background Image Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/case_studies_hero.webp')" }}
        />

        {/* Dark Gradient Overlay (the "shadow") */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-DM sans font-semibold tracking-widest text-[#BD8E32] mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-zinc-400">Resources</span>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">Case Studies</span>
          </nav>

          <div className="max-w-2xl flex flex-col items-start text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-3">
              Accelerating Growth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BD8E32] to-[#f8d08b]">
                Real Startup Success.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              Explore how we guide startups and MSMEs through company registration, secure critical government grants, maximize taxation exemptions, and manage compliance audits to turn innovative visions into structured enterprises.
            </p>
          </div>

        </div>
      </section>

      {/* ── 2. DYNAMIC WORKSPACE ── */}
      <section className="py-12 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto w-full flex-grow">

        {/* Dynamic header stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-300 pb-6 mb-4 gap-4 padding-left: 5px">
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 font-DM sans padding-left: 5px">All Case Studies</h2>
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
                placeholder="Search by keyword, industry, location..."
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
            <p className="text-DM sans text-neutral-800 mt-2">
              Showing {filteredCaseStudies.length} of {caseStudiesData.length} strategic placements
            </p>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 mb-10 padding-left: 5px">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(4); // Reset pagination
              }}
              className={`px-4 py-2 sm:text-DM sans font-semibold rounded-3xl transition-all duration-200 border cursor-pointer mb-0 ${activeCategory === cat
                ? "bg-black border-black text-white shadow-sm"
                : "bg-white border-zinc-300 text-zinc-700 hover:border-[#BD8E32] hover:text-[#BD8E32]"
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
            {filteredCaseStudies.length === 0 ? (
              <div className="text-center py-20 bg-[#F6F4F0] rounded-3xl border border-zinc-150 p-8">
                <Info className="w-12 h-12 text-[#BD8E32] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-zinc-800">No case studies found</h3>
                <p className="text-zinc-500 text-DM sans mt-2 max-w-md mx-auto">
                  We couldn't find any results matching "{searchTerm}" under "{activeCategory}". Try clearing search keywords or choosing another category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All Articales");
                  }}
                  className="mt-6 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl text-DM sans font-semibold transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCaseStudies.slice(0, visibleCount).map((study) => (
                    <div
                      key={study.id}
                      onClick={() => setSelectedCaseStudy(study)}
                      className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md hover:scale-[1.01] hover:border-zinc-200/80 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        {/* Card Image */}
                        <div className="relative w-full aspect-[1.6/1] overflow-hidden bg-neutral-100">
                          <img
                            src={study.image}
                            alt={study.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* <div className="absolute top-4 left-4 bg-black/75 text-[#BD8E32] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-[#BD8E32]/30 backdrop-blur-sm">
                            {study.industry}
                          </div> */}
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between text-DM sans text-zinc-400 font-medium mb-3">
                            <span className="text-[#BD8E32] font-bold">{study.category}</span>
                            <span>{study.location}</span>
                          </div>

                          <h3 className="text-1xl text-DM sans font-bold text-neutral-800 leading-snug group-hover:text-[#BD8E32] transition-colors mb-3">
                            {study.title}
                          </h3>

                          <p className="text-DM sans text-neutral-800 leading-relaxed line-clamp-3">
                            {study.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer Metric */}
                      <div className="px-6 py-4 border-t border-zinc-50 flex items-center justify-between bg-zinc-50/50">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-DM sans font-bold text-neutral-800">{study.metrics}</span>
                        </div>
                        <span className="flex items-center gap-1 text-DM sans font-bold text-[#BD8E32] group-hover:translate-x-1 transition-transform">
                          Read Story <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination button */}
                {hasMore && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={loadMore}
                      className="px-6 py-3 bg-[#f8f8f7] rounded-3xl hover:bg-zinc-300 active:bg-zinc-300 text-zinc-950 font-bold text-DM sans border border-zinc-200 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      Load More Case Studies
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Quick Service Links */}
            <div className="bg-[#fffffe] rounded-3xl p-6 border border-zinc-300 mt-0">
              <h3 className="text-DM sans font-bold uppercase tracking-widest text-[#764A04] border-b border-zinc-200 pb-3 mb-4">
                Our Services
              </h3>
              <div className="flex flex-col gap-1">
                <a href="/services/startup" className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                  <span>Startup Registration</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                </a>
                <a href="/services/dpiit" className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                  <span>DPIIT Recognition</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                </a>
                <a href="/services/msme" className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                  <span>MSME Registration</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                </a>
                <a href="/services/funding" className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                  <span>Funding Support</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                </a>
                <a href="/services/compliance" className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-DM sans font-medium text-zinc-800 hover:text-[#BD8E32] transition-all">
                  <span>Compliance & Audit</span> <ChevronRight className="w-4 h-4 text-zinc-400" />
                </a>
              </div>
            </div>

            <div className="lg:sticky lg:top-8 flex flex-col gap-6">
              {/* Newsletter Subscription */}
              <div className="bg-[#120E07] rounded-3xl p-6 border border-zinc-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#BD8E32]/10 rounded-full blur-2xl" />
                {/* <Mail className="w-8 h-8 text-[#BD8E32] mb-4" /> */}
                <h3 className="text-lg font-bold font-DM text-white">Monthly Insights</h3>
                <p className="text-DM sans text-zinc-400 mt-2 leading-relaxed mb-4">
                  Receive curated articles on regulatory mandates, government schemes, and financial planning for Indian startups.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/10 text-white placeholder-zinc-500 py-2.5 px-4 rounded-xl border border-white/20 focus:outline-none focus:border-[#BD8E32] text-DM sans transition-colors"
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

              {/* Side Credential Banner */}
              <div className="border border-zinc-300 rounded-3xl p-6 flex flex-col gap-4 bg[#fffffe]">
                <h4 className="text-DM sans font-semibold text-zinc-900 uppercase tracking-widest">Why Arambh Advisory?</h4>
                <div className="flex gap-4 items-start">
                  <span className="bg-[#F6F4F0] p-2.5 rounded-xl text-[#BD8E32]">
                    <Landmark className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="text-DM sans font-semibold text-zinc-800">Gov-linked Expertise</h5>
                    <p className="text-DM sans text-zinc-700 mt-1 leading-relaxed">
                      Direct access to official channels ensures smooth query closures.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-[#F6F4F0] p-2.5 rounded-xl text-[#BD8E32]">
                    <Briefcase className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="text-DM sans font-bold text-zinc-800">Founder First Policy</h5>
                    <p className="text-DM sans text-zinc-700 mt-1 leading-relaxed">
                      Transparent milestones, direct guidance, and optimized timelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ── 3. INTERLINKS SECTION ── */}
      <section className="bg-[#ffff] py-16 px-6 sm:px-12 md:px-16 border-t border-zinc-300 mt-0">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold font-DM sans text-neutral-800 mb-2">How We Can Help You Succeed</h2>
            <p className="text-DM sans text-neutral-800 mt-0">Explore the primary advisory solutions featured in the case studies above.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-150 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#BD8E32] flex items-center justify-center mb-5">
                  <Globe className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest">Growth Engine</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-2 mb-3">DPIIT & Startup India</h4>
                <p className="text-DM sans sm:text-DM sans text-neutral-800 leading-relaxed mb-6">
                  Set up your business to secure major taxation exemptions, seed grants, intellectual property rebates, and self-compliance benefits.
                </p>
              </div>
              <a href="/services/dpiit" className="flex items-center gap-2 text-DM sans font-bold text-neutral-800 hover:text-[#BD8E32] transition-colors pt-4 border-t border-zinc-700">
                Explore DPIIT Benefits <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white border border-zinc-150 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#BD8E32] flex items-center justify-center mb-5">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest">Financial Fuel</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-0 mb-3">Government Funding</h4>
                <p className="text-DM sans sm:text-DM sans text-neutral-800 leading-relaxed mb-6">
                  Navigate state seed funds, priority financing schemes, and interest subsidies with expert audits and optimized project proposals.
                </p>
              </div>
              <a href="/services/funding" className="flex items-center gap-2 text-DM sans font-bold text-neutral-800 hover:text-[#BD8E32] transition-colors pt-4 border-t border-zinc-700">
                Explore Funding Options <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white border border-zinc-150 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#BD8E32] flex items-center justify-center mb-5">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest">Operational Guard</span>
                <h4 className="text-lg font-bold text-zinc-900 mt-2 mb-3">Corporate Advisory</h4>
                <p className="text-DM sans sm:text-DM sans text-neutral-800 leading-relaxed mb-6">
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

      {/* ── 4. CASE STUDY DETAIL MODAL ── */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity">

          {/* Modal Card container */}
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-zinc-900/50 max-h-[90vh]">

            {/* Header image band */}
            <div className="relative w-full h-[200px] bg-neutral-100 flex-shrink-0">
              <img
                src={selectedCaseStudy.image}
                alt={selectedCaseStudy.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 pr-6 text-white">
                <div className="flex items-center gap-3 text-DM sans text-[#BD8E32] font-semibold mb-2">
                  <span>{selectedCaseStudy.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" />
                  <span>{selectedCaseStudy.location}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-DM sans tracking-tight">
                  {selectedCaseStudy.title}
                </h3>
              </div>
            </div>

            {/* Scrollable details body */}
            <div className="p-6 overflow-y-auto space-y-6 text-neutral-800">

              {/* Highlight metrics banner */}
              <div className="bg-[#F6F4F0] border-l-4 border-[#BD8E32] p-4 rounded-r-xl flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="text-DM sans font-bold uppercase tracking-wider text-[#764A04]">Key Outcome achieved</h4>
                  <p className="text-DM sans font-bold text-neutral-900 mt-0.5">{selectedCaseStudy.metrics}</p>
                </div>
              </div>

              {/* Challenge section */}
              <div className="space-y-2">
                <h4 className="text-DM sans font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" /> The Challenge
                </h4>
                <p className="text-DM sans sm:text-base text-neutral-800 leading-relaxed font-sans">
                  {selectedCaseStudy.challenge}
                </p>
              </div>

              {/* Solution section */}
              <div className="space-y-2">
                <h4 className="text-DM sans font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" /> The Solution
                </h4>
                <p className="text-DM sans sm:text-base text-neutral-800 leading-relaxed font-sans">
                  {selectedCaseStudy.solution}
                </p>
              </div>

              {/* Result section */}
              <div className="space-y-2 pb-2">
                <h4 className="text-DM sans font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" /> The Outcome
                </h4>
                <p className="text-DM sans sm:text-base text-neutral-800 leading-relaxed font-sans">
                  {selectedCaseStudy.result}
                </p>
              </div>

            </div>

            {/* Footer close button */}
            <div className="p-4 border-t border-zinc-100 flex justify-end bg-zinc-700 flex-shrink-0">
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="px-5 py-2 bg-black hover:bg-zinc-800 text-white rounded-xl text-DM sans font-semibold transition-colors cursor-pointer"
              >
                Close Story
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── 5. BOTTOM CALL TO ACTION ── */}
      {/* <section className="relative overflow-hidden bg-gradient-to-b from-[#120E07] via-[#764A04] to-[#BD8E32] text-white py-20 px-6 sm:px-12 md:px-16">
      
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#BD8E32]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-8">
          <div className="flex flex-col max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-semibold font-DM tracking-tight leading-tight text-white">
              Ready to give your business a strong start?
            </h2>
            <p className="text-white/80 text-DM sans sm:text-base font-sans mt-4 leading-relaxed max-w-lg">
              Book a free 30-minute call. We give you honest advice on what your business actually needs, with zero commitments.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="px-6 py-3 rounded-lg font-DM bg-white hover:bg-neutral-100 text-[#764A04] hover:text-black font-semibold transition-all shadow-[0px_0px_11px_0px_#FFFFFF40_inset,0px_0px_4px_0px_#FFFFFF40] inline-block text-DM sans"
              >
                Schedule a Call
              </a>
            </div>
          </div>
          

          <div className="hidden md:block text-white/5 w-[320px] h-[320px] select-none pointer-events-none absolute right-[-20px] bottom-[-60px] transform rotate-12">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-current stroke-[4]">
              <path d="M25 80 L50 30" strokeLinecap="round" />
              <path d="M50 30 L75 80" strokeLinecap="round" />
              <path d="M38 58 L62 58" strokeLinecap="round" />
              <path d="M30 80 L75 25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M58 25 H75 V42" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>


      <footer className="w-full bg-gradient-to-b from-[#120E07] via-[#764A04] to-[#BD8E32] text-zinc-300 font-sans border-t border-zinc-900 relative">
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />


        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 bg-transparent relative z-10">
          

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="text-white w-50 h-12 relative">
                <Image
                  src={logo}
                  alt="Arambh Advisory Logo"
                  className="object-contain w-full h-full brightness-0 invert"
                />
              </div>
            </div>
            <p className="text-DM sans text-zinc-400 leading-relaxed mt-2">
              Arambh Advisory helps startups and MSMEs turn ideas into successful businesses. From company registration and government recognition to funding support and compliance.
            </p>
            

            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>


          <div className="flex flex-col gap-4">
            <h3 className="text-DM sans font-bold uppercase tracking-widest text-zinc-400">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-DM sans font-medium">
              <li><a href="/about" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="/schemes" className="hover:text-amber-400 transition-colors">Government Schemes</a></li>
              <li><a href="/blog" className="hover:text-amber-400 transition-colors">Blog</a></li>
              <li><a href="/faqs" className="hover:text-amber-400 transition-colors">FAQs</a></li>
              <li><a href="/contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>


          <div className="flex flex-col gap-4">
            <h3 className="text-DM sans font-bold uppercase tracking-widest text-zinc-400">Services</h3>
            <ul className="flex flex-col gap-3 text-DM sans font-medium">
              <li><a href="/services/startup" className="hover:text-amber-400 transition-colors">Startup Registration</a></li>
              <li><a href="/services/dpiit" className="hover:text-amber-400 transition-colors">DPIIT Recognition</a></li>
              <li><a href="/services/msme" className="hover:text-amber-400 transition-colors">MSME Registration</a></li>
              <li><a href="/services/funding" className="hover:text-amber-400 transition-colors">Government Funding Support</a></li>
              <li><a href="/services/consulting" className="hover:text-amber-400 transition-colors">Business Consulting</a></li>
              <li><a href="/services/compliance" className="hover:text-amber-400 transition-colors">Compliance & Advisory</a></li>
            </ul>
          </div>


          <div className="flex flex-col gap-6">
            <h3 className="text-DM sans font-bold uppercase tracking-widest text-zinc-400">Reach Out</h3>
            <div className="flex flex-col gap-4 text-DM sans text-zinc-300">
              
              <div className="flex items-center gap-3">
                <span className="text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622c0-1.037.828-1.84 1.854-1.84h4.863c.383 0 .733.204.918.54l1.58 2.87c.156.284.06.634-.216.812l-1.393.904a11.026 11.026 0 0 0 3.902 3.902l.904-1.393c.178-.276.528-.372.812-.216l2.87 1.58c.336.185.54.535.54.918v4.863c0 1.026-.803 1.854-1.84 1.854a15.42 15.42 0 0 1-15.42-15.42Z" />
                  </svg>
                </span>
                <span className="font-medium">+91 88665 56327</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="font-medium">info@arambhservices.com</span>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-white mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="font-medium">Ahmedabad, Gujarat, India</span>
                  <span className="text-zinc-400 text-DM sans mt-1">Mon – Sat, 9:30 AM – 6:30 PM</span>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div className="bg-[#BD8E32] px-6 sm:px-12 md:px-16 py-4 text-DM sans text-zinc-100 font-medium border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span>© 2026 Arambh Advisory. All rights reserved.</span>
            <div className="w-24 h-6 relative brightness-0 invert opacity-80">
              <Image
                src={logo}
                alt="Arambh Advisory Logo"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>

      </footer> */}

    </div>
  );
}