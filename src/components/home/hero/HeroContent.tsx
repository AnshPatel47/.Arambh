import { Button } from "@/components/ui/button";
import HeroBadges from "./HeroBadges";

export default function HeroContent() {
  return (
    <div
      className="
      min-h-0
      h-full
      flex
      flex-col
      rounded-[32px]
      border
      border-[#E8E1D8]
      bg-white
      p-8
      shadow-sm
    "
    >
      {/* Trusted Badge */}

      <div
        className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#E8E1D8]
        bg-white
        px-4
        py-2
        text-xs
        font-DM Sans
        uppercase
        tracking-[0.25em]
        text-[#666]
      "
      >
        <span className="h-2 w-2 rounded-full bg-[#B8860B]" />
        Trusted by 350+ Businesses
      </div>

      {/* Heading */}

      <h1
        className="
        mt-8
        text-6xl
        font-DM Sans
        leading-tight
        text-[#1F1F1F]
      "
      >
        Your Trusted Startup &
        <br />
        Business Growth Partner
      </h1>

      {/* Description */}

      <p
        className="
        mt-6
        text-base
        leading-8
        text-[#666]
      "
      >
        Whether you&apos;re launching a startup or scaling an existing
        business, Arambh Advisory provides registration,
        government funding, compliance and strategic consulting
        under one roof.
      </p>

      {/* Buttons */}

      <div className="mt-10 flex gap-4">
        <Button className="rounded-full bg-black px-7 py-6 hover:bg-neutral-900">
          Book a Free Consultation
        </Button>

        <Button
          variant="outline"
          className="rounded-full px-7 py-6"
        >
          Explore Services
        </Button>
      </div>

      {/* Features */}

      <HeroBadges />
    </div>
  );
}