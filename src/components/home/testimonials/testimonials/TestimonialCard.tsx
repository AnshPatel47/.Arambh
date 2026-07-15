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
      <div className="rounded-[22px] border border-[#E6E0D6] bg-white px-6 py-6">
        {/* Solid curved double quotation mark SVG in solid black */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-4 h-8 w-8 text-[#131313] opacity-100"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.748-9.762 9-10.974v2.859c-3.12.75-5.416 3.12-5.416 6.13h5.416v9.376h-9zm-14 0v-7.391c0-5.704 3.748-9.762 9-10.974v2.859c-3.12.75-5.416 3.12-5.416 6.13h5.416v9.376h-9z" />
        </svg>

        <p className="text-[16px] font-medium leading-7 text-[#1A1A1A]">
          &quot;{testimonial.quote}&quot;
        </p>
      </div>

      {/* User Section */}
      <div className="mt-1 flex items-center justify-between rounded-2xl border border-[#E6E0D6] bg-[#F6F4F0] px-6 py-4">
        <div>
          <h4 className="text-[16px] font-semibold text-black">
            {testimonial.name}
          </h4>

          <p className="mt-1 text-sm font-medium text-[#666666]">
            {testimonial.role}
          </p>
        </div>

        <div className="h-14 w-14 overflow-hidden rounded-xl border border-[#E6E0D6] bg-white relative">
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