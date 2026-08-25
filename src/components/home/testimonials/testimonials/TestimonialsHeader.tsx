import SectionHeader from "@/components/SectionHeader";

export default function TestimonialsHeader() {
  return (
    <div className="max-w-[549px] text-center lg:text-left mx-auto lg:mx-0 reveal">
      <SectionHeader
        align="left"
        alignMobile="center"
        className="w-full ![text-align:center] lg:![text-align:left] !mx-auto lg:!mx-0"
        title={
          <>
            <span className="block lg:whitespace-nowrap">
              Trusted by <span className="text-[#C2943A]">Founders</span>
            </span>
            <span className="block mt-2">
              Who Dream Big
            </span>
          </>
        }
      />
    </div>
  );
}