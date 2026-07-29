export default function BlogsHeader() {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-center
        gap-6
      "
    >
      {/* Heading */}
      <h2
        className="
          text-center
          text-[32px]
          lg:text-[48px]
          font-medium
          leading-[120%]
          tracking-[-0.02em]
          text-[#131313]
        "
      >
        Insights &amp; Guides
      </h2>

      {/* Horizontal divider line (width matches card row) */}
      <div className="w-full h-px bg-[#E6DFD4]" />
    </div>
  );
}