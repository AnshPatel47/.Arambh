"use client";

import { useState } from "react";
import FAQItem from "./FAQItem";
import { faqItems } from "./faq.data";

export default function FAQList() {
  // FAQ #2 is open by default (matches Figma)
  const [openId, setOpenId] = useState<number>(2);

  const handleToggle = (id: number) => {
    // Close if already open
    if (openId === id) {
      setOpenId(0);
      return;
    }

    // Otherwise open clicked FAQ
    setOpenId(id);
  };

  return (
    <div
      className="
        flex
        h-auto
        lg:h-[392px]
        w-full
        max-w-[647px]
        flex-col
        justify-between
        gap-2
        sm:gap-3
        lg:gap-0
        rounded-2xl
        border
        border-[#DDD6CA]
        bg-[#F6F4F0]
        p-3
        sm:p-4
      "
    >
      {faqItems.map((item) => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}