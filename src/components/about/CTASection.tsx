import { ArrowRight } from "lucide-react";
import { ctaCards } from "./about.data";

export default function CTASection() {
  return (
    <section className="w-full bg-[#FFF8F6] py-24 pb-32 reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rv-up">
          {ctaCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-[24px] border border-[#E6DFD4] bg-white p-7 md:p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-transparent text-left h-full"
            >
              <div>
                <div className="inline-flex items-center rounded-full border border-[#DDD6CA] bg-[#F6F4F0] px-3 py-[6px]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#333333]">
                    {card.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-[26px] md:text-[30px] font-semibold leading-[120%] tracking-[-0.03em] text-[#131313]">
                  {card.title}
                </h3>

                <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-[#666666]">
                  {card.description}
                </p>
              </div>

              <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#131313] px-6 py-3 text-white transition hover:bg-black cursor-pointer w-fit">
                {card.button}

                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}