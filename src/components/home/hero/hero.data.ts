export interface Scheme {
  id: number;
  amount: string;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}

export const schemes: Scheme[] = [
  {
    id: 1,
    amount: "UP TO ₹2 CRORE",
    title: "NAIF Scheme",
    description: "The Agriculture Infrastructure Fund (AIF), also called NAIF, funds post-harvest infrastructure like cold storage, warehouses and processing units.",
    icon: "/images/naif.svg", 
    bgColor: "#EAF5EA",
  },
  {
    id: 2,
    amount: "UP TO ₹500 LAKHS",
    title: "Startup India Seed Fund (SISFS)",
    description: "Access milestone-based grants for proof of concept and debt/convertible funding for market entry and scale.",
    icon: "/images/sisfs.svg", 
    bgColor: "#FDF2F2", 
  },
  {
    id: 3,
    amount: "UP TO ₹500 LAKHS",
    title: "Real-Time Performance Visibility", 
    description: "Track how work progresses as it happens. OptiCore updates continuously, allowing leaders to spot shifts in productivity.",
    icon: "/images/real-time.svg", 
    bgColor: "#EFF6FF", 
  },
];