import type { ConstellationData } from "@/lib/types";

export const WATCHERS = [
  "Secretive Plotter",
  "Demon King of Salvation",
  "Demon-Like Judge of Fire",
  "Queen of the Darkest Spring",
  "Prisoner of the Golden Headband",
  "Master of Steel",
  "Abyssal Black Flame Dragon",
  "Maritime War God",
  "Bald General of Justice",
  "Monarch of White Frost",
  "Father of the Rich Night",
  "Lord of the Infinite Realms",
  "Watcher of the Eternal Flame",
];

export const WATCHER_MSGS = [
  "is watching your story with great interest.",
  "has sponsored 1,000 coins.",
  "is delighted by your skills.",
  "wants to recruit you as an incarnation.",
  "is nodding in approval.",
  "has placed a bet on your success.",
  "is intrigued by your stigma.",
  "has donated 5,000 coins to this channel.",
  "is quietly observing your progress.",
  "thinks this incarnation has potential.",
  "is shocked by this development.",
  "is spreading word of your story.",
  "has recommended your scenario to other constellations.",
];

export const CONSTELLATIONS: ConstellationData[] = [
  { name: "Ursa Major", stars: [{ x: 0, y: .2 }, { x: .12, y: .15 }, { x: .24, y: .18 }, { x: .36, y: .25 }, { x: .38, y: .4 }, { x: .52, y: .42 }, { x: .5, y: .22 }], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]], mag: [1.8, 2.2, 1.8, 3.3, 2.4, 2.4, 1.8] },
  { name: "Orion", stars: [{ x: .35, y: 0 }, { x: .65, y: .02 }, { x: .42, y: .3 }, { x: .5, y: .32 }, { x: .58, y: .3 }, { x: .3, y: .65 }, { x: .7, y: .62 }, { x: .5, y: .45 }], lines: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [3, 7]], mag: [.5, 1.6, 1.7, 1.7, 2.2, 2.1, .2, 3.5] },
  { name: "Cassiopeia", stars: [{ x: 0, y: .3 }, { x: .22, y: .05 }, { x: .45, y: .25 }, { x: .62, y: 0 }, { x: .85, y: .18 }], lines: [[0, 1], [1, 2], [2, 3], [3, 4]], mag: [3.4, 2.7, 2.5, 2.2, 2.3] },
  { name: "Leo", stars: [{ x: 0, y: .45 }, { x: .2, y: .35 }, { x: .35, y: .18 }, { x: .55, y: .1 }, { x: .6, y: .3 }, { x: .72, y: .48 }, { x: .8, y: .6 }, { x: .9, y: .55 }, { x: .95, y: .65 }], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [5, 1]], mag: [2.1, 2.6, 3.3, 1.4, 3.5, 2, 3.4, 3.9, 3] },
  { name: "Scorpius", stars: [{ x: .4, y: 0 }, { x: .45, y: .1 }, { x: .5, y: .22 }, { x: .52, y: .36 }, { x: .48, y: .5 }, { x: .4, y: .62 }, { x: .3, y: .72 }, { x: .22, y: .82 }, { x: .15, y: .9 }, { x: .12, y: .95 }], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]], mag: [2.3, 2.6, 1, 2.8, 2.3, 3, 3.6, 3.3, 1.6, 2.7] },
  { name: "Cygnus", stars: [{ x: .5, y: 0 }, { x: .5, y: .3 }, { x: .5, y: .7 }, { x: .25, y: .35 }, { x: .75, y: .35 }], lines: [[0, 1], [1, 2], [3, 1], [1, 4]], mag: [1.3, 2.2, 3.1, 2.5, 2.9] },
  { name: "Lyra", stars: [{ x: .5, y: 0 }, { x: .35, y: .35 }, { x: .65, y: .35 }, { x: .3, y: .65 }, { x: .7, y: .65 }], lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4]], mag: [0, 3.5, 4.3, 4.2, 3.2] },
  { name: "Gemini", stars: [{ x: .15, y: 0 }, { x: .3, y: .05 }, { x: .12, y: .25 }, { x: .28, y: .3 }, { x: .08, y: .55 }, { x: .35, y: .55 }, { x: .05, y: .8 }, { x: .4, y: .78 }], lines: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7]], mag: [1.6, 1.1, 3.6, 3.6, 1.9, 3.5, 2.9, 3.4] },
];
