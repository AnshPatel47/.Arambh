"use client";

import React, { useEffect } from "react";
import ContactForm from "@/components/contact/ContactForm";
import ScrollToTopButton from "@/components/scrollarrow/ScrollToTopButton";
import PageHeroHeader from "@/components/PageHeroHeader";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

export default function ContactUs() {
  // Cards Data inside the component scope
  const cards = [
    {
      id: 1,
      title: "Main Office",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300",
      content: (
        <p className="text-sm font-DM sans text-gray-100 leading-relaxed">
          Ahmedabad, Gujarat, India
          <br />
          Mon – Sat, 9:30 AM – 6:30 PM
        </p>
      ),
    },
    {
      id: 2,
      title: "Email",
      image:
        "https://images.unsplash.com/photo-1587560699334-bea93391dcef?auto=format&fit=crop&q=80&w=300",
      content: (
        <div className="text-m font-DM sans text-gray-100 space-y-1">
          <p>info@arambhservices.com</p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Reception",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
      content: (
        <div className="text-m font-DM sans text-gray-100 space-y-1">
          <p>+91 88665 56327</p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Social Links",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=300",
      content: (
        <div className="flex flex-col items-center">
          <p className="text-s font-DM sans text-gray-100 mb-3">
            Contact with social networks
          </p>
          <div className="flex items-center space-x-2">
            {/* <a
              href="#"
              className="w-7 h-7 rounded-full border border-zinc-100 text-zinc-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors text-xs"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-7 h-7 rounded-full border border-zinc-100 text-zinc-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors text-xs"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a> */}
            <a
              href="https://www.linkedin.com/company/aramabh-services-llp/posts/?feedView=all"
              target="_blank"
              className="w-7 h-7 rounded-full border border-zinc-100 text-zinc-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors text-xs"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
               href="https://www.instagram.com/arambh_services?igsh=MW1iYjQ2cTVkM2Riag%3D%3D&igsi=MW1iYjQ2cTVkM2Riag%3D%3D&utm_source=qr"
               target="_blank"
               rel="noopener noreferrer"
               className="w-7 h-7 rounded-full border border-zinc-100 text-zinc-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors text-xs"
               aria-label="Instagram"
             >
             <FaInstagram />
            </a>
            {/* <a
              href="#"
              className="w-7 h-7 rounded-full border border-zinc-100 text-zinc-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors text-xs"
              aria-label="Google Plus"
            >
              <FaGooglePlusG />
            </a>
            <a
              href="#"
              className="w-7 h-7 rounded-full border border-zinc-100 text-zinc-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors text-xs"
              aria-label="Pinterest"
            >
              <FaPinterestP />
            </a> */}
          </div>
        </div>
      ),
    },
  ];

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

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const targetElements = document.querySelectorAll(
      ".reveal, .rv-up, .txt-up"
    );

    targetElements.forEach((el) => observer.observe(el));

    return () => {
      targetElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between relative">
      {/* ── CSS ANIMATION STYLES ── */}
      <style jsx global>{`
        /* Whole Card Container Scroll Reveal Animation */
        .reveal,
        .rv-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal.is-visible,
        .rv-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Outer Heading & Paragraph Reveal Animation */
        .txt-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .txt-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Outer Text Delays */
        .txt-delay-1 {
          transition-delay: 120ms;
        }
        .txt-delay-2 {
          transition-delay: 240ms;
        }
        .txt-delay-3 {
          transition-delay: 360ms;
        }
      `}</style>

      {/* ── 1. HERO SECTION ── */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-[#120E07] text-white pt-44 pb-20 lg:pb-24 px-6 sm:px-12 md:px-16 min-h-[440px] lg:min-h-[480px] flex items-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('/assets/images/contact_hero_netbounce.webp')",
          }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120E07] via-[#120E07]/90 to-transparent z-10" />

        <div className="max-w-[1440px] mx-auto w-full relative z-20 flex flex-col justify-center items-start">
          {/* Reusable Hero Header */}
          <PageHeroHeader
            breadcrumbCurrent="Contact Us"
            title={
              <>
                Let's Start a <br />
                <span className="text-[#C2943A]">Conversation.</span>
              </>
            }
            description="Whether you need expert advice on corporate compliance, startup registration, or business structuring, our advisory team is ready to guide you."
          />

          {/* Call Us Now Button */}
          <div className="mt-8 txt-up txt-delay-3">
            <a
              href="tel:+918866556327"
              className="group flex items-center gap-3 bg-[#C2943A] hover:bg-[#a67c29] text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 text-DM sans"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              Call Us Now
            </a>
          </div>
        </div>
      </section>

     {/* ── 2. CARDS SECTION ── */}
<section className="py-12 sm:py-20 bg-white">
  {/* Container aligned with ContactForm */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 sm:gap-16 lg:gap-6 pt-6 sm:pt-12">
    {cards.map((card, idx) => (
      <div
        key={card.id}
        /* 
          Fixed uniform height on mobile: h-[165px] 
          Resets back to flex height on desktop: sm:h-auto sm:min-h-[220px]
        */
        className="rv-up relative bg-[#C2943A] text-white pt-10 pb-4 px-4 sm:pt-14 sm:pb-8 sm:px-5 rounded-2xl text-center shadow-lg flex flex-col items-center justify-between h-[165px] sm:h-auto sm:min-h-[220px]"
        style={{ transitionDelay: `${idx * 100}ms` }}
      >
        {/* Floating Top Image */}
        <div className="absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold mb-1 tracking-tight text-white mt-1 sm:mt-3">
          {card.title}
        </h3>

        {/* Card Content (Centered cleanly) */}
        <div className="w-full text-amber-50 text-xs sm:text-sm leading-relaxed flex-1 flex flex-col items-center justify-center">
          {card.content}
        </div>
      </div>
    ))}
  </div>
</section>
  <ScrollToTopButton heroSectionId="hero-section" />
  <ContactForm />
</div>
  );
}