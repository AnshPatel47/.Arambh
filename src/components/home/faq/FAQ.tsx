import FAQHeader from "./FAQHeader";
import FAQCTA from "./FAQCTA";
import FAQList from "./FAQList";

export default function FAQ() {
  return (
    <section id="faq" className="w-full bg-[#FBF7EE] py-12 lg:py-20 flex items-center">
      <div className="mx-auto flex flex-col lg:flex-row w-full max-w-[1440px] justify-between items-center lg:items-stretch gap-10 lg:gap-16 px-6 lg:px-20">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center lg:items-start justify-between w-full lg:w-1/2 max-w-[480px] gap-8 lg:gap-0 text-center lg:text-left">
          <FAQHeader />
          <FAQCTA />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/2 lg:max-w-[640px] flex justify-center lg:justify-end mx-auto lg:mx-0">
          <FAQList />
        </div>
      </div>
    </section>
  );
}