import Image from "next/image";
import { Testimonial } from "./testimonials.types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <article className="w-full rounded-3xl border border-[#E6E0D6] bg-[#F6F4F0] p-1 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Review Section */}
      <div className="rounded-[22px] border border-[#E6E0D6] bg-white px-5 py-5 sm:px-6 sm:py-6">
        {/* Solid curved double quotation mark SVG in solid black */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-3 sm:mb-4 h-7 w-7 sm:h-8 sm:w-8 text-[#131313] opacity-100"
        >
          <path d="M9.983 3v7.391c0 5.704-3.747 9.762-9 10.974v-2.859c3.12-.75 5.417-3.125 5.417-6.13H0V3h9.983zm14 0v7.391c0 5.704-3.748 9.762-9 10.974v-2.859c3.12-.75 5.417-3.125 5.417-6.13H14V3h9.983z" />
        </svg>

        <p className="text-[14px] sm:text-[16px] font-medium leading-6 sm:leading-7 text-[#1A1A1A]">
          “{testimonial.quote}”
        </p>
      </div>

      {/* User Section */}
      <div className="mt-1 flex items-center justify-between rounded-2xl border border-[#E6E0D6] bg-[#F6F4F0] px-5 py-3 sm:px-6 sm:py-4">
        <div>
          <h4 className="text-sm sm:text-[16px] font-semibold text-black">
            {testimonial.name}
          </h4>

          <p className="mt-1 text-[12px] sm:text-sm font-medium text-[#666666]">
            {testimonial.role}
          </p>
        </div>

        <div className="h-11 w-11 sm:h-14 sm:w-14 overflow-hidden rounded-xl border border-[#E6E0D6] bg-white relative">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}