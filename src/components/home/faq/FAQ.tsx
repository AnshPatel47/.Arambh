import FAQHeader from "./FAQHeader";
import FAQCTA from "./FAQCTA";
import FAQList from "./FAQList";

export default function FAQ() {
  return (
    <section className="w-full bg-[#FBF7EE] pt-16 pb-20 lg:pt-20 lg:pb-56 min-h-[calc(100vh-60px)] flex items-center">
      <div className="mx-auto flex flex-col lg:flex-row h-auto lg:h-[392px] w-full max-w-[1120px] justify-between gap-8 px-6 lg:px-0">
        {/* LEFT */}

        <div className="flex flex-col items-center lg:items-start justify-between w-full lg:w-[457px] h-auto lg:h-[392px] gap-6 lg:gap-0">
          <FAQHeader />

          <FAQCTA />
        </div>

        {/* RIGHT */}

        <div className="w-full lg:w-[647px] h-auto lg:h-[392px]">
          <FAQList />
        </div>
      </div>
    </section>
  );
}