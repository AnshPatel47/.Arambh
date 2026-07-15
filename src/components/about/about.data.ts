import {
  CTA,
  Founder,
  ProcessStep,
  Stat,
  Value,
} from "./about.types";

export const stats: Stat[] = [
  {
    value: "100+",
    label: "Founders backed, Idea to incorporated",
  },
  {
    value: "₹50L+",
    label: "Raised in funding without collateral",
  },
  {
    value: "7 yrs",
    label: "Focused on this work, and only this",
  },
  {
    value: "11 days",
    label: "Our fastest DPIIT recognition",
  },
];

export const founders: Founder[] = [
  {
    initials: "BD",
    name: "Brijesh Desai",
    role: "Founder",
    description:
      "Brijesh started Arambh after years of watching capable founders get worn down by paperwork. He leads registration, DPIIT recognition and the funding side, and he is usually the person on your first call.",
    phone: "+91 88665 56327",
  },
  {
    initials: "RM",
    name: "Rishabh Makwana",
    role: "Co-Founder",
    description:
      "Rishabh runs compliance and operations, the quiet engine that keeps GST, tax and ROC filings on time. If a deadline is coming up, he already knows about it.",
    phone: "+91 88665 56327",
  },
];

export const values: Value[] = [
  {
    number: "01",
    title: "We answer.",
    description:
      "A real person who knows your file, on the phone the same day. No bots, no ticket queue.",
  },
  {
    number: "02",
    title: "We commit the date.",
    description:
      "Honest timelines agreed up front, then kept. GST in three days means three days.",
  },
  {
    number: "03",
    title: "We price it openly.",
    description:
      "The full fee, in writing, before any work begins. No surprise extras, ever.",
  },
  {
    number: "04",
    title: "We stay on.",
    description:
      "The relationship does not end at a certificate. We remain the number you call as you grow.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "A real conversation",
    description:
      "Tell us your goals and where you are stuck. Thirty minutes, zero pressure, and an actual person on the line instead of a sales script.",
  },
  {
    number: "02",
    title: "A clear roadmap",
    description:
      "We map exactly what you need: structure, registrations, compliance, eligibility, and what each step costs, in writing, before we begin.",
  },
  {
    number: "03",
    title: "We do the work",
    description:
      "Paperwork, filings, follow ups. You get updates that make sense in plain language, never a wall of jargon or a silent inbox.",
  },
  {
    number: "04",
    title: "Certificates in hand",
    description:
      "Company live. GST active. DPIIT recognised. Every milestone documented, explained, and handed over, along with the benefits it unlocks.",
  },
  {
    number: "05",
    title: "We stay on",
    description:
      "Growth does not end at registration. We remain your advisory partner, the number you call when the next question comes up.",
  },
];

export const ctaCards: CTA[] = [
  {
    tag: "JUST STARTING OUT",
    title: "I am starting my first business.",
    description:
      "No idea where to begin? Good. That is exactly the right time to call. We turn the confusion into a clear, prioritised plan, then file it for you.",
    button: "Start from zero",
  },
  {
    tag: "ALREADY RUNNING",
    title: "I have revenue and need to scale.",
    description:
      "You are past survival. Now you need clean compliance, the right capital, and a sharper strategy. We handle the back office so you can run the business.",
    button: "Scale up",
  },
];