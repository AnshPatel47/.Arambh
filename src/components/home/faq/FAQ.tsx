import FAQHeader from "./FAQHeader";
import FAQCTA from "./FAQCTA";
import FAQList from "./FAQList";

export default function FAQ() {
  return (
    <section id="faq" className="w-full bg-[#FBF7EE] py-12 lg:py-20 flex items-center">
     <div className="mx-auto flex flex-col lg:flex-row w-full max-w-[1440px] justify-between gap-10 lg:gap-16 px-6 lg:px-20">
        {/* LEFT */}

        <div className="flex flex-col items-center lg:items-start justify-between w-full lg:w-1/2 max-w-[480px] gap-8 lg:gap-12">
          <FAQHeader />

          <FAQCTA />
        </div>

        {/* RIGHT */}

        <div className="w-full lg:w-1/2 lg:max-w-[640px]">
          <FAQList />
        </div>
      </div>
    </section>
  );
}