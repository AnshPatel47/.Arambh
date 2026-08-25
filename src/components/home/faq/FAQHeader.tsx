import SectionHeader from "@/components/SectionHeader";

export default function FAQHeader() {
  return (
    <div className="w-full flex justify-center lg:justify-start">
      <SectionHeader
        align="left"
        alignMobile="center"
        className="max-w-[302px] lg:w-[302px] ![text-align:center] lg:![text-align:left] [&_*]:![text-align:center] lg:[&_*]:![text-align:left] !mx-auto lg:!mx-0"
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