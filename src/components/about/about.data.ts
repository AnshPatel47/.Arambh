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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },
  {
    initials: "RM",
    name: "Rishabh Makwana",
    role: "Co-Founder",
    description:
      "Rishabh runs compliance and operations, the quiet engine that keeps GST, tax and ROC filings on time. If a deadline is coming up, he already knows about it.",
    phone: "+91 88665 56327",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
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
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Direct 1-on-1 discussion with our core founders",
      "Assessment of business model, structure & funding needs",
      "Zero commitment & transparent honest guidance",
      "Clear immediate action items for your startup",
    ],
  },
  {
    number: "02",
    title: "A clear roadmap",
    description:
      "We map exactly what you need: structure, registrations, compliance, eligibility, and what each step costs, in writing, before we begin.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Tailored legal & regulatory structure recommendation",
      "Upfront transparent fee quotation with no hidden costs",
      "Comprehensive milestone timelines & eligibility criteria",
      "Document checklist tailored for your specific entity",
    ],
  },
  {
    number: "03",
    title: "We do the work",
    description:
      "Paperwork, filings, follow ups. You get updates that make sense in plain language, never a wall of jargon or a silent inbox.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Complete MCA, GST & DPIIT portal filings handled for you",
      "Real-time progress updates in plain language",
      "Continuous follow-ups with government departments",
      "Zero administrative hassle for founders",
    ],
  },
  {
    number: "04",
    title: "Certificates in hand",
    description:
      "Company live. GST active. DPIIT recognised. Every milestone documented, explained, and handed over, along with the benefits it unlocks.",
    image: "/assets/images/process_step4.png",
    bullets: [
      "Official Certificate of Incorporation & PAN/TAN issued",
      "Active GSTIN & DPIIT Recognition Certificate delivered",
      "Unlocked tax exemptions & government scheme access",
      "Organized digital repository of all incorporation documents",
    ],
  },
  {
    number: "05",
    title: "We stay on",
    description:
      "Growth does not end at registration. We remain your advisory partner, the number you call when the next question comes up.",
    image: "/assets/images/process_step5.png",
    bullets: [
      "Ongoing monthly ROC, GST & annual compliance support",
      "Priority advisory for government grants & loans",
      "Periodic financial health checks & cap-table advice",
      "Dedicated founder helpline whenever new questions arise",
    ],
  },
];

export const ctaCards: CTA[] = [
  {
    tag: "JUST STARTING OUT",
    title: "I am starting my first business.",
    description:
      "No idea where to begin? Good. That is exactly the right time to call. We turn the confusion into a clear, prioritised plan, then file it for you.",
    button: "Start from zero",
    problem: {
      title: "Overwhelmed by legal jargon & filings",
      description:
        "Navigating Pvt Ltd vs LLP, MCA portals, GST registration, and DPIIT recognition without making expensive mistakes.",
    },
    solution: {
      title: "Complete launch & incorporation roadmap",
      description:
        "Direct 1-on-1 founder support, transparent upfront pricing, and guaranteed 11-day average incorporation turnaround.",
    },
  },
  {
    tag: "ALREADY RUNNING",
    title: "I have revenue and need to scale.",
    description:
      "You are past survival. Now you need clean compliance, the right capital, and a sharper strategy. We handle the back office so you can run the business.",
    button: "Scale up",
    problem: {
      title: "Compliance drag & missed funding options",
      description:
        "Managing monthly ROC and GST deadlines while trying to unlock government grants and non-collateral capital.",
    },
    solution: {
      title: "Proactive compliance & capital advisory",
      description:
        "Dedicated monthly compliance management alongside access to seed funds, DPIIT benefits, and government schemes.",
    },
  },
];