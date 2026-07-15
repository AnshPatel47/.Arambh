import { CTAData, Testimonial } from "./testimonials.types";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Arambh Advisory made our startup registration process effortless. Their team guided us at every stage and ensured everything was completed on time.",
    name: "Rahul Shah",
    role: "Founder, Tech Startup",
    image: "/images/rahul.svg", 
  },
  {
    id: 2,
    quote:
      "We struggled to understand government schemes until we partnered with Arambh. Their expertise helped us unlock opportunities we didn't know existed.",
    name: "Neha Patel",
    role: "MSME Owner",
    image: "/images/neha.svg", 
  },
  {
    id: 3,
    quote:
      "Professional, transparent, and always available. Their end-to-end support allowed us to focus on growing our business.",
    name: "Karan Mehta",
    role: "Manufacturing Business",
    image: "/images/karan.svg", 
  },
];

export const ctaData: CTAData = {
  title: "Grow your business like above",
  description:
    "If you have any questions, just book a 15-minute call with us before subscribing.",
  image: "/images/rahul.svg",
  buttonText: "Schedule a Call",
};