import React from 'react';
import { Globe, TrendingUp, FileText, ArrowRight } from 'lucide-react';

const advisoryServices = [
  {
    icon: Globe,
    tag: "Growth Engine",
    title: "DPIIT & Startup India",
    description:
     "Set up your business to secure major taxation exemptions, seed grants, intellectual property rebates, and self-compliance benefits.",
    link: "/services/startup-india-government-recognition",
    linkText: "Explore DPIIT Benefits",
    delay: "100ms",
  },
  {
    icon: TrendingUp,
    tag: "Financial Fuel",
    title: "Government Funding",
    description:
      "Navigate state seed funds, priority financing schemes, and interest subsidies with expert audits and optimized project proposals.",
    link: "/services/government-funding",
    linkText: "Explore Funding Options",
    delay: "200ms",
  },
  {
    icon: FileText,
    tag: "Operational Guard",
    title: "Corporate Advisory",
    description:
      "Maintain immaculate corporate logs, clean cap tables, monthly tax filings, and full regulatory conformity to stay investor-ready.",
    link: "/services/business-registration",
    linkText: "Explore Compliance Services",
    delay: "300ms",
  },
];

export default function Interservices() {
  return (
    <section className="bg-white pt-12 pb-6 sm:py-16 px-4 sm:px-6 md:px-8 ">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="reveal mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 txt-up">
            How We Can Help You Succeed
          </h2>
          <p className="text-zinc-900 text-base mt-2 txt-up txt-delay-1">
            Explore the primary advisory solutions featured in the articles above.
          </p>
          <div className="w-full border-t border-zinc-300 mt-7 pt-0 flex justify-center mb-2" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {advisoryServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="rv-up bg-white border border-zinc-300 p-8 rounded-3xl shadow-xs flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
                style={{ transitionDelay: service.delay }}
              >
                <div>
                  <span className="w-10 h-10 rounded-xl bg-[#F6F4F0] text-[#C2943A] flex items-center justify-center mb-3">
                    <IconComponent className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold text-[#BD8E32] uppercase tracking-widest mb-0">
                    {service.tag}
                  </span>
                  <h4 className="text-lg font-bold text-zinc-900 mt-0 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-base text-zinc-900 leading-relaxed mb-3">
                    {service.description}
                  </p>
                </div>
                <a
                  href={service.link}
                  className="flex items-center gap-2 text-base font-bold text-[#BD8E32] transition-colors pt-4 border-t border-zinc-300"
                >
                  {service.linkText} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}