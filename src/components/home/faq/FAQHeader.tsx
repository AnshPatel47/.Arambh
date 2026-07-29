export default function FAQHeader() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
      {/* Heading */}
      <h2
        className="
          max-w-[302px]
          lg:w-[302px]
          font-medium
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