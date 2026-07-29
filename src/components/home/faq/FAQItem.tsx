import { Plus, X } from "lucide-react";
import { FAQItem as FAQItemType } from "./faq.types";

interface FAQItemProps {
  item: FAQItemType;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({
  item,
  isOpen,
  onToggle,
}: FAQItemProps) {
  return (
   <div
  className={`
    transition-all
    duration-300
    ease-in-out
    ${
      isOpen
        ? "rounded-xl border border-[#DDD6CA] bg-white p-3 sm:p-4"
        : "px-1.5 py-1.5 sm:px-2 sm:py-2"
    }
  `}
>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 sm:gap-4 text-left"
      >
        <h3
          className="
            text-[15px]
            sm:text-[18px]
            font-semibold
            leading-[130%]
            sm:leading-[140%]
            text-[#131313]
          "
        >
          {item.question}
        </h3>

        <div className="flex h-6 w-6 items-center justify-center flex-shrink-0">
          {isOpen ? (
            <X
              size={18}
              strokeWidth={2}
              className="text-[#131313] sm:w-5 sm:h-5"
            />
          ) : (
            <Plus
              size={18}
              strokeWidth={2}
              className="text-[#131313] sm:w-5 sm:h-5"
            />
          )}
        </div>
      </button>

     {isOpen && (
  <p className="mt-2 sm:mt-3 pr-8 text-[13px] sm:text-[16px] font-medium leading-5 sm:leading-7 text-[#666666]">
    {item.answer}
  </p>
)}
    </div>
  );
}