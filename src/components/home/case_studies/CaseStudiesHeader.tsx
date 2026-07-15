export default function CaseStudiesHeader() {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-start
        gap-3
        text-left
      "
    >
      {/* Tag */}
      <div
        className="
          flex
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
        <span className="h-2 w-2 rounded-full bg-[#333333]" />

        <span
          className="
            text-[12px]
            font-semibold
            uppercase
            tracking-[0.1em]
            leading-[140%]
            text-[#333333]
          "
        >
          Case Studies
        </span>
      </div>

      {/* Heading - matching netbounce sizes */}
      <h2
        className="
          text-[28px]
          lg:text-[38px]
          font-medium
          leading-[120%]
          tracking-[-0.02em]
          text-[#131313]
        "
      >
        Proven Growth &amp; Startup Success
      </h2>
    </div>
  );
}
