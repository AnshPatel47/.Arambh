import SectionHeader from "@/components/SectionHeader";

export default function FAQHeader() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
      <SectionHeader
        align="left"
        className="max-w-[302px] lg:w-[302px]"
        title={
          <>
            Frequently
            <br />
            Asked Questions
          </>
        }
      />
    </div>
  );
}