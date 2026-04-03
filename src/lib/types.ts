export interface Stigma {
  name: string;
  tier: "Mythic" | "Legendary" | "Epic" | "Rare";
  lv: number;
  icon: string;
  cat: string;
  desc: string;
}

export interface Scenario {
  id: number;
  type: "Main" | "Sub" | "Hidden";
  title: string;
  diff: string;
  status: string;
  tech: string[];
  short: string;
  full: string;
  challenges: string[];
  reward: string;
  duration: string;
  team: string;
  repo?: string;
  images?: string[];
}

export interface Profile {
  name: string;
  age: number;
  title: string;
  level: number;
  class: string;
  constellation: string;
  attribute: string;
  personalSkills: { n: string; lv: number }[];
  stigmaList: { n: string; lv: number }[];
  stats: Record<string, string>;
  languages: { n: string; lv: string }[];
  evaluation: string;
  bars: Record<string, number>;
}

export interface TimelineEntry {
  year: string;
  role: string;
  co: string;
  desc: string;
}

export interface Contact {
  label: string;
  icon: string;
  href: string;
}

export interface ConstellationStar {
  x: number;
  y: number;
}

export interface ConstellationData {
  name: string;
  stars: ConstellationStar[];
  lines: [number, number][];
  mag: number[];
}
