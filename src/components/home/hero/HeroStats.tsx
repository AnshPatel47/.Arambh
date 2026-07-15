"use client";

export default function HeroStats() {
  return (
    <section className="w-full bg-[#FFF8F6] py-6 flex justify-center px-4 lg:px-12">
      <div
        className="
          w-full
          max-w-[1200px]
          grid
          grid-cols-1
          md:grid-cols-3
          bg-[#FFF8F6]
          py-4
          md:py-5
        "
      >
        {[
          { num: "250+", lbl: "Businesses Served" },
          { num: "₹50 Cr+", lbl: "Funding Facilitated" },
          { num: "20+", lbl: "Expert Advisors" },
        ].map((s, index) => (
          <div
            key={s.lbl}
            className="
              relative
              flex
              flex-col
              items-center
              justify-center
              py-2
              px-4
              text-center
            "
          >
            <span
              className="
                text-[30px]
                md:text-[43px]
                font-bold
                text-[#131313]
                leading-none
                tracking-tight
              "
              style={{ fontFamily: "var(--font-dm), sans-serif" }}
            >
              {s.num}
            </span>
            <span
              className="
                mt-3
                text-[13px]
                md:text-[14px]
                font-medium
                text-[#666665]
                tracking-normal
              "
              style={{ fontFamily: "var(--font-dm), sans-serif" }}
            >
              {s.lbl}
            </span>
            {index < 2 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-neutral-200" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
