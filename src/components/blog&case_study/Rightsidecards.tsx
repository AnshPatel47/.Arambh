'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface NewsletterCardProps {
  onSubscribe?: (email: string) => Promise<void> | void;
}

export function NewsletterCard({ onSubscribe }: NewsletterCardProps) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput) return;

    setEmailStatus('sending');
    try {
      if (onSubscribe) {
        await onSubscribe(emailInput);
      } else {
        await new Promise((res) => setTimeout(res, 800));
      }
      setEmailStatus('success');
      setEmailInput('');
    } catch {
      setEmailStatus('error');
    }
  };

  return (
    <>
      {/* 1. Monthly Insights Newsletter */}
      <div className="static rv-up bg-white rounded-[16px] p-4 border text-[18px] text-DM sans border-zinc-300 shadow-xs overflow-hidden mb-4 mt-3 antialiased [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#BD8E32]/10 rounded-full blur-xl pointer-events-none" />
        <h3 className="text-xl font-bold text-zinc-900 border-b border-zinc-300 pb-2 mb-2.5">
          Monthly Insights
        </h3>
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
            disabled={emailStatus === 'sending'}
            className="w-full bg-[#BD8E32] hover:bg-[#764A04] text-white py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer disabled:opacity-60"
          >
            {emailStatus === 'sending' ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>
        {emailStatus === 'success' && (
          <p className="text-[#BD8E32] text-xs font-semibold text-center mt-2">
            Thank you! You have subscribed successfully.
          </p>
        )}
        {emailStatus === 'error' && (
          <p className="text-red-500 text-xs font-semibold text-center mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      {/* 2. Core Offerings Links */}
      <div className=" static rv-up bg-white rounded-[16px] p-4 border border-zinc-300 shadow-xs text-DM sans mt-0 antialiased [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]">
        <h3 className="font-bold uppercase tracking-wider text-zinc-900 text-[16px] border-b border-zinc-300 pb-2 mb-2.5">
          Core Offerings
        </h3>
        <div className="flex flex-col gap-0.5">
          <a
            href="/services/business-registration"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-sm font-medium text-zinc-800 hover:text-[#C2943A] transition-all"
          >
            <span>Startup Registration</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          </a>
          <a
            href="/services/dpiit-recognition"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-sm font-medium text-zinc-800 hover:text-[#C2943A] transition-all"
          >
            <span>DPIIT Recognition</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          </a>
          <a
            href="/services/msme-registration"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-sm font-medium text-zinc-800 hover:text-[#C2943A] transition-all"
          >
            <span>MSME Registration</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          </a>
          <a
            href="/services/government-funding"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-sm font-medium text-zinc-800 hover:text-[#C2943A] transition-all"
          >
            <span>Funding Support</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          </a>
          <a
            href="/services/compliance-regulatory-support"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-sm font-medium text-zinc-800 hover:text-[#C2943A] transition-all"
          >
            <span>Compliance & Audit</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          </a>
        </div>
      </div>
    </>
  );
}