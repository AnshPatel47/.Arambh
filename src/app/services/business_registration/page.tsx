"use client";

import React, { useState } from "react";
import { DM_Sans } from "next/font/google";
import {
  ChevronRight,
  Compass,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Landmark,
  FileText,
  FileCheck,
  ChevronDown
} from "lucide-react";

// Configure DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export default function BusinessRegistrationGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setEmailStatus("sending");
    setTimeout(() => {
      setEmailStatus("success");
      setEmailInput("");
    }, 1200);
  };

  const faqs = [
    {
      q: "How long does it take to register a Private Limited Company?",
      a: "Typically, it takes 7 to 14 working days to register a Private Limited Company, subject to document verification and MCA approval times."
    },
    {
      q: "Do I need to be physically present for the registration?",
      a: "No, the entire process is 100% online. We use Digital Signature Certificates (DSC) to sign and file your documents remotely."
    },
    {
      q: "Can a residential address be used as a registered office?",
      a: "Yes, you can use your residential address. You just need to provide a No Objection Certificate (NOC) from the property owner and a utility bill."
    }
  ];

  return (
    <div className={`min-h-screen bg-[#F8F9FA] text-zinc-900 antialiased flex flex-col justify-between ${dmSans.className}`}>

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-32 px-6 sm:px-12 md:px-16 min-h-[520px] flex items-center">

        {/* Background Image Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/images/br2.webp')" }}
        />

        {/* Dark Gradient Overlay (the "shadow") */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-DM sans font-semibold tracking-widest text-[#BD8E32] mb-6 uppercase" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-zinc-400">Services</span>
            <ChevronRight className="w-3 h-3 text-zinc-500" />
            <span className="text-white">Business Registration</span>
          </nav>

          <div className="max-w-2xl flex flex-col items-start text-left">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full border border-[#BD8E32]/30 bg-[#BD8E32]/10 text-DM sans font-semibold tracking-widest text-[#BD8E32] uppercase backdrop-blur-sm text-xs">
              Complete Guide
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-semibold tracking-tight leading-tight text-white mb-4">
              Business Registration <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BD8E32] to-[#f8d08b]">
                for Startups & MSMEs
              </span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl text-DM sans">
              Expert research, legal frameworks, and policy updates designed to help Indian entrepreneurs structure their corporate compliance and leverage institutional benefits.
            </p>
          </div>

        </div>
      </section>

      {/* ── 2. LAYOUT GRID CONTAINER ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-0 pb-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

          {/* Left Column: Scrollable Blog Content */}
          <div className="lg:col-span-8 space-y-16">

            {/* Quick Navigation (Mobile Only) */}
            <div className="block lg:hidden mt-6">
              <div className="bg-[#120E07]/95 border border-[#BD8E32]/25 rounded-2xl p-5 backdrop-blur-md shadow-2xl text-zinc-300">
                <h3 className="text-sm font-semibold text-[#BD8E32] uppercase tracking-widest flex items-center gap-2 mb-3">
                  <Compass className="w-5 h-5" /> Quick Navigation
                </h3>
                <div className="flex flex-col text-sm text-zinc-300">
                  <a href="#introduction" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform">Introduction</span>
                    <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Read</span>
                  </a>
                  <a href="#benefits" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform">Key Benefits</span>
                    <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded"><span className="font-mono">4</span> Core</span>
                  </a>
                  <a href="#eligibility" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform">Eligibility</span>
                    <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Checklist</span>
                  </a>
                  <a href="#documents" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform">Documents Required</span>
                    <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Vault</span>
                  </a>
                  <a href="#process" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform">Registration Process</span>
                    <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Steps</span>
                  </a>
                  <a href="#faq" className="flex justify-between items-center py-2.5 hover:text-[#BD8E32] transition-colors group">
                    <span className="group-hover:translate-x-1 transition-transform">FAQs</span>
                    <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Help</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Blog Content Sections */}
            <div className="space-y-16 pt-0">

              {/* Introduction */}
              <div id="introduction" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-DM sans">Introduction to Private Limited Companies</h2>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm">
                  <p className="mb-6 text-lg sm:text-xl text-neutral-800 font-medium DM sans leading-relaxed">
                    A Private Limited Company (PLC) is a privately held business entity with limited liability protection. It is the most preferred structure for startups and growing businesses, offering legal separation between owners and the company, making it an independent legal entity.
                  </p>
                  <p className="text-neutral-600 DM sans leading-relaxed">
                    This structure restricts the number of shareholders to 50 and prohibits public trading of shares, ensuring a secure and professional business setup. It also makes raising funds from venture capitalists and angel investors significantly easier, providing a strong foundation for sustainable, long-term growth.
                  </p>
                </div>
              </div>

              {/* Key Benefits */}
              <div id="benefits" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-8">Key Benefits of Registration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:border-[#BD8E32] transition-colors group">
                    <ShieldCheck className="w-10 h-10 text-[#BD8E32] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-2">Limited Liability</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">{"Founders' personal assets are fully protected. Your liability is strictly limited only to the amount of shares you hold in the company."}</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:border-[#BD8E32] transition-colors group">
                    <Landmark className="w-10 h-10 text-[#BD8E32] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-2">Easy Fundraising</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">It is the only corporate structure strictly preferred by VC funds, Angel Networks, and institutional investors for equity funding.</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:border-[#BD8E32] transition-colors group">
                    <TrendingUp className="w-10 h-10 text-[#BD8E32] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-2">Separate Legal Entity</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">The company can own property, incur debt, and file lawsuits completely independent of its founders or directors.</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:border-[#BD8E32] transition-colors group">
                    <CheckCircle2 className="w-10 h-10 text-[#BD8E32] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-2">Brand Credibility</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">{"The \"Pvt Ltd\" tag adds massive credibility, making it easier to attract top-tier talent, close B2B enterprise clients, and secure bank loans."}</p>
                  </div>

                </div>
              </div>

              {/* Eligibility Requirements & Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div id="eligibility" className="scroll-mt-32">
                  <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-8">Eligibility Requirements</h2>
                  <ul className="space-y-4">
                    {[
                      "Minimum 2 Directors (Maximum 15)",
                      "Minimum 2 Shareholders (Maximum 200)",
                      "At least 1 Director must be an Indian Resident",
                      "No minimum capital requirement"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#BD8E32] shrink-0 mt-0.5" />
                        <span className="text-zinc-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="documents" className="scroll-mt-32">
                  <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-8">Documents Required</h2>
                  <ul className="space-y-4">
                    {[
                      "PAN Card of all Directors",
                      "ID Proof (Voter ID / Passport / Driving License)",
                      "Address Proof (Bank Statement / Mobile Bill)",
                      "NOC & Utility Bill for Registered Office"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                        <FileText className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                        <span className="text-zinc-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Process Timeline */}
              <div id="process" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-8 text-center">The Registration Process</h2>

                <div className="relative border-l-2 border-zinc-200 ml-6 md:ml-1/2 space-y-12">

                  <div className="relative pl-8">
                    <div className="absolute w-10 h-10 bg-[#BD8E32] rounded-full text-white font-semibold flex items-center justify-center -left-[21px] top-0 shadow-lg border-4 border-[#F8F9FA] font-mono">1</div>
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                      <h4 className="text-xl font-semibold text-zinc-900 mb-2">Digital Signature & DIN</h4>
                      <p className="text-zinc-600">First, we apply for Digital Signature Certificates (DSC) and Director Identification Numbers (DIN) for all proposed directors.</p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute w-10 h-10 bg-[#BD8E32] rounded-full text-white font-semibold flex items-center justify-center -left-[21px] top-0 shadow-lg border-4 border-[#F8F9FA] font-mono">2</div>
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                      <h4 className="text-xl font-semibold text-zinc-900 mb-2">Name Approval (RUN)</h4>
                      <p className="text-zinc-600">We file the Reserve Unique Name (RUN) application with the MCA to ensure your chosen brand name is legally available and reserved.</p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute w-10 h-10 bg-[#BD8E32] rounded-full text-white font-semibold flex items-center justify-center -left-[21px] top-0 shadow-lg border-4 border-[#F8F9FA] font-mono">3</div>
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                      <h4 className="text-xl font-semibold text-zinc-900 mb-2">Incorporation Filing (SPICe+)</h4>
                      <p className="text-zinc-600">We draft the MoA & AoA and file the comprehensive SPICe+ form which handles company registration, PAN, and TAN simultaneously.</p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute w-10 h-10 bg-[#120E07] rounded-full text-[#BD8E32] font-semibold flex items-center justify-center -left-[21px] top-0 shadow-lg border-4 border-[#F8F9FA]">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="bg-[#120E07] p-6 rounded-2xl shadow-lg border border-[#BD8E32]/30 text-white">
                      <h4 className="text-xl font-semibold text-[#BD8E32] mb-2">Certificate of Incorporation</h4>
                      <p className="text-zinc-300">Congratulations! You receive your official Certificate of Incorporation and can immediately open a corporate bank account.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* FAQs */}
              <div id="faq" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
                      >
                        {faq.q}
                        <ChevronDown className={`w-5 h-5 text-[#BD8E32] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === index && (
                        <div className="px-6 pb-5 text-zinc-600 bg-white leading-relaxed border-t border-zinc-100 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Subscription (visible only on mobile at the bottom) */}
              <div className="block lg:hidden mt-8">
                <div className="bg-[#120E07]/90 rounded-2xl p-4 border border-white/10 text-[#BD8E32] relative overflow-hidden backdrop-blur-md shadow-2xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#BD8E32]/10 rounded-full blur-2xl" />
                  <h3 className="text-2xl font-semibold font-DM text-[#BD8E32] flex items-center gap-2 mb-1.5">
                    {/* <Mail className="w-4 h-4 text-[#BD8E32]" /> */}
                    Monthly Insights
                  </h3>
                  <p className="text-[16px] text-zinc-400 leading-relaxed mb-2.5">
                    Curated regulatory mandates, government schemes, and financial updates for Indian startups.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-white/10 text-white placeholder-zinc-500 py-1.5 px-3 rounded-lg border border-white/20 focus:outline-none focus:border-[#BD8E32] text-DM sans transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "sending"}
                      className="w-full bg-[#BD8E32] hover:bg-[#764A04] text-white py-1.5 rounded-lg font-semibold text-DM sans transition-all cursor-pointer"
                    >
                      {emailStatus === "sending" ? "Subscribing..." : "Subscribe Now"}
                    </button>
                  </form>
                  {emailStatus === "success" && (
                    <p className="text-[#BD8E32] text-[10px] font-semibold text-center mt-2">
                      Thank you! You have subscribed successfully.
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Sticky Sidebar Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-6 self-start lg:mt-14">

            {/* Table of Contents (Quick Nav) */}
            <div className="hidden lg:block bg-[#120E07]/95 border border-[#BD8E32]/25 rounded-2xl p-5 backdrop-blur-md shadow-2xl text-zinc-300">
              <h3 className="text-sm font-semibold text-[#BD8E32] uppercase tracking-widest flex items-center gap-2 mb-3">
                <Compass className="w-5 h-5" /> Quick Navigation
              </h3>
              <div className="flex flex-col text-sm text-zinc-300">
                <a href="#introduction" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Introduction</span>
                  <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Read</span>
                </a>
                <a href="#benefits" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Key Benefits</span>
                  <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded"><span className="font-mono">4</span> Core</span>
                </a>
                <a href="#eligibility" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Eligibility</span>
                  <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Checklist</span>
                </a>
                <a href="#documents" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Documents Required</span>
                  <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Vault</span>
                </a>
                <a href="#process" className="flex justify-between items-center border-b border-white/5 py-2.5 hover:text-[#BD8E32] transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Registration Process</span>
                  <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Steps</span>
                </a>
                <a href="#faq" className="flex justify-between items-center py-2.5 hover:text-[#BD8E32] transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">FAQs</span>
                  <span className="text-[10px] uppercase font-semibold bg-white/10 px-2 py-0.5 rounded">Help</span>
                </a>
              </div>
            </div>

            {/* Newsletter Subscription (visible only on desktop in the sidebar) */}
            <div className="hidden lg:block">
              <div className="bg-[#120E07]/90 rounded-2xl p-4 border border-white/10 text-white relative overflow-hidden backdrop-blur-md shadow-2xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#BD8E32]/10 rounded-full blur-2xl" />
                <h3 className="text-2xl font-semibold font-DM text-white flex items-center gap-2 mb-1.5">
                  {/* <Mail className="w-4 h-4 text-[#BD8E32]" /> */}
                  Monthly Insights
                </h3>
                <p className="text-[16px] text-zinc-400 leading-relaxed mb-2.5">
                  Curated regulatory mandates, government schemes, and financial updates for Indian startups.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/10 text-white placeholder-zinc-500 py-1.5 px-3 rounded-lg border border-white/20 focus:outline-none focus:border-[#BD8E32] text-DM sans transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === "sending"}
                    className="w-full bg-[#BD8E32] hover:bg-[#764A04] text-white py-1.5 rounded-lg font-semibold text-DM sans transition-all cursor-pointer"
                  >
                    {emailStatus === "sending" ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>
                {emailStatus === "success" && (
                  <p className="text-[#BD8E32] text-[10px] font-semibold text-center mt-2">
                    Thank you! You have subscribed successfully.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
