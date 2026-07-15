export default function FAQHeader() {
  return (
    <div className="flex flex-col gap-3">
      {/* FAQ Tag */}
      <div
        className="
          inline-flex
          w-fit
          items-center
          gap-2
          rounded-full
          border
          border-[#DDD6CA]
          bg-[#F6F4F0]
          px-3
          py-[6px]
        "
      >
        <span className="h-[6px] w-[6px] rounded-full bg-[#131313]" />

        <span
          className="
          font-semibold
            text-[12px]
            uppercase
            tracking-[0.10em]
            text-[#333333]
          "
        >
          FAQ
        </span>
      </div>

      {/* Heading */}
      <h2
        className="
          w-[302px]
          font-semibold
          text-[32px]
          leading-[120%]
          tracking-[-0.02em]
          text-[#131313]
        "
      >
        Frequently
        <br />
        Asked Questions
      </h2>
    </div>
  );
}