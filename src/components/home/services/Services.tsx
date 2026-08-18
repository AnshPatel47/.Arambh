"use client";

import ServicesHeader from "./ServicesHeader";
import ServicesSlider from "./ServicesSlider";

export default function Services() {
  return (
    <section id="services" className="w-full bg-[#FBF7EE] py-12 lg:py-20 overflow-hidden flex flex-col justify-center reveal">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20 w-full flex flex-col gap-12">
        <ServicesHeader />
        <ServicesSlider />
      </div>
    </section>
  );
}