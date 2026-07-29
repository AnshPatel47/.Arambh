export default function TestimonialsHeader() {
  return (
    <div className="max-w-[549px] text-center md:text-left mx-auto md:mx-0 reveal">
      {/* Heading - with netbounce inspired clamp size and professional gold accent */}
      <h2
        className="
          text-[28px]
          xs:text-[32px]
          sm:text-[36px]
          md:text-[40px]
          lg:text-[48px]
          font-semibold
          leading-[115%]
          tracking-[-0.03em]
          text-[#111111]
          rv-up
        "
      >
        <span className="block md:whitespace-nowrap">
          Trusted by <span className="text-[#C2943A]">Founders</span>
        </span>
        <span className="block mt-2">
          Who Dream Big
        </span>
      </h2>
    </div>
  );
}