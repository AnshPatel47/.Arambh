import SectionHeader from "@/components/SectionHeader";

export default function TestimonialsHeader() {
  return (
    <div className="max-w-[549px] text-center md:text-left mx-auto md:mx-0 reveal">
      <SectionHeader
        align="left"
        title={
          <>
            <span className="block md:whitespace-nowrap">
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