export default function BlogsHeader() {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-center
        gap-3
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
          Blogs
        </span>
      </div>

      {/* Heading */}
      <h2
        className="
          text-center
          text-[32px]
          lg:text-[48px]
          font-semibold
          leading-[120%]
          tracking-[-0.02em]
          text-[#131313]
        "
      >
        Explore our Knowledge Hub
      </h2>
    </div>
  );
}