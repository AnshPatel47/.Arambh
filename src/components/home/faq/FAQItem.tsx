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
        ? "rounded-xl border border-[#DDD6CA] bg-white p-4"
        : "px-2 py-3"
    }
  `}
>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <h3
          className="
            text-[18px]
            font-semibold
            leading-[140%]
            text-[#131313]
          "
        >
          {item.question}
        </h3>

        <div className="flex h-6 w-6 items-center justify-center flex-shrink-0">
          {isOpen ? (
            <X
              size={20}
              strokeWidth={2}
              className="text-[#131313]"
            />
          ) : (
            <Plus
              size={20}
              strokeWidth={2}
              className="text-[#131313]"
            />
          )}
        </div>
      </button>

     {isOpen && (
  <p className="mt-3 pr-8 text-[16px] font-medium leading-7 text-[#666666]">
    {item.answer}
  </p>
)}
    </div>
  );
}