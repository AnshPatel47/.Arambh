export type PinSide = "left" | "right";

export interface Pin {
  id: string;
  title: string;
  sub: string;
  // popup card position, as % of the 683.68 x 469.41 right-side box (from Figma px)
  left: number;
  top: number;
  width: number;
  height: number;
  delay: number;
  side: PinSide;
}

// Figma right-side box: 683.679... x 469.41...
const BOX_W = 683.67919921875;
const BOX_H = 469.4101867675781;

const pct = (px: number, total: number) => (px / total) * 100;

export const PINS: Pin[] = [
  {
    id: "delhi",
    title: "5+ Startups",
    sub: "DELHI",
    left: pct(226.65, BOX_W),
    top: pct(68.12, BOX_H),
    width: pct(123.85, BOX_W),
    height: pct(54.95, BOX_H),
    delay: 0,
    side: "left",
  },
  {
    id: "gujarat",
    title: "25+ Clients",
    sub: "GUJARAT",
    left: pct(40.87, BOX_W),
    top: pct(108.99, BOX_H),
    width: pct(123.85, BOX_W),
    height: pct(54.95, BOX_H),
    delay: 150,
    side: "left",
  },
  {
    id: "maharashtra",
    title: "12+ Startups",
    sub: "MAHARASHTRA",
    left: pct(44.59, BOX_W),
    top: pct(183.31, BOX_H),
    width: pct(123.85, BOX_W),
    height: pct(54.95, BOX_H),
    delay: 300,
    side: "left",
  },
  {
    id: "hyderabad",
    title: "2 Startups",
    sub: "HYDERABAD",
    left: pct(282.39, BOX_W),
    top: pct(257.62, BOX_H),
    width: pct(123.85, BOX_W),
    height: pct(54.95, BOX_H),
    delay: 450,
    side: "right",
  },
];
export const MAP_BOX = { w: 683.67919921875, h: 469.4101867675781 };


export const MAP_LAYER = {
  width: 610.9202798476872,
  height: 322.02309746416427,
  left: 36.2146,  
  top: 73.5726,   
};