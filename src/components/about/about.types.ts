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
}

export interface CTA {
  tag: string;
  title: string;
  description: string;
  button: string;
}