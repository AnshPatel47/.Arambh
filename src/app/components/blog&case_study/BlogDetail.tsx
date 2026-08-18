"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, Clock } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  image: string;
}

export interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogDetailModal({ post, onClose }: BlogDetailModalProps) {
  // Close on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (post) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Card Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col border border-zinc-300 max-h-[85vh] mt-12">
        {/* Header Image Band */}
        <div className="relative w-full h-[220px] sm:h-[260px] bg-neutral-100 flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 text-white hover:bg-white hover:text-black p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none z-10 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Header Content */}
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 pr-10 sm:pr-6 text-white">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#BD8E32] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2">
              <span>{post.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" />
              <span className="text-zinc-300 text-xs font-normal">{post.readTime}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" />
              <span className="text-zinc-300 text-xs font-normal">{post.date}</span>
            </div>
            <h3 className="text-base sm:text-2xl font-semibold tracking-tight leading-snug line-clamp-2">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 text-zinc-900">
          {/* Author / Meta Strip */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-300"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#BD8E32]/20 text-[#BD8E32] font-bold flex items-center justify-center text-sm">
                  {post.author.name?.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-900 leading-tight">
                  {post.author.name}
                </p>
                <p className="text-xs text-zinc-500">{post.author.role || "Author"}</p>
              </div>
            </div>
            <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" /> {post.readTime}
            </span>
          </div>

          {/* Key Summary / Overview Banner */}
          <div className="bg-[#F6F4F0] border-l-4 border-[#BD8E32] p-3.5 sm:p-4 rounded-r-xl flex items-start gap-3 sm:gap-4">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-[#764A04]">
                Summary
              </h4>
              <p className="text-xs sm:text-sm text-zinc-800 mt-1 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>

          {/* Full Article Body */}
          <div className="space-y-3 text-sm sm:text-base text-zinc-800 leading-relaxed">
            <h4 className="font-bold uppercase tracking-wider text-xs text-zinc-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD8E32]" /> Full Article
            </h4>
            <p className="whitespace-pre-line text-zinc-800">
              {post.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}