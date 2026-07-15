import FAQHeader from "./FAQHeader";
import FAQCTA from "./FAQCTA";
import FAQList from "./FAQList";

export default function FAQ() {
  return (
    <section className="w-full bg-white py-24 min-h-[calc(100vh-60px)] flex items-center">
      <div className="mx-auto flex h-[392px] w-[1120px] justify-between">
        {/* LEFT */}

        <div className="flex h-[392px] w-[457px] flex-col justify-between">
          <FAQHeader />

          <FAQCTA />
        </div>

        {/* RIGHT */}

        <div className="h-[392px] w-[647px]">
          <FAQList />
        </div>
      </div>
    </section>
  );
}