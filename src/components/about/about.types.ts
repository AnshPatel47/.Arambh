export interface Stat {
  value: string;
  label: string;
}

export interface Founder {
  initials: string;
  name: string;
  role: string;
  description: string;
  phone: string;
  image?: string;
}

export interface Value {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image?: string;
  bullets?: string[];
}

export interface CTA {
  tag: string;
  title: string;
  description: string;
  button: string;
  problem: {
    title: string;
    description: string;
  };
  solution: {
    title: string;
    description: string;
  };
}