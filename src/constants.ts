// constants.ts
// Woodcutting images
import ashImg from '@assets/skills/trees/ash.png';
import birchImg from '@assets/skills/trees/birch.png';
import ebonyImg from '@assets/skills/trees/ebony.png';
import elmImg from '@assets/skills/trees/elm.png';
import mahoganyImg from '@assets/skills/trees/mahogany.png';
import mapleImg from '@assets/skills/trees/maple.png';
import oakImg from '@assets/skills/trees/oak.png';
import pineImg from '@assets/skills/trees/pine.png';
import pounceOakImg from '@assets/skills/trees/pounceOak.png';
import spruceImg from '@assets/skills/trees/spruce.png';
import teakImg from '@assets/skills/trees/teak.png';
import voidWhiskerImg from '@assets/skills/trees/voidWhisker.png';
import willowImg from '@assets/skills/trees/willow.png';

export function xpForLevel(level: number): number {
  if (level <= 30) {
    return 40 * level + 15 * Math.pow(level - 1, 1.3);
  } else if (level <= 100) {
    return 50 * level + 25 * Math.pow(level - 1, 1.5);
  } else {
    return 70 * level + 40 * Math.pow(level - 1, 1.7);
  }
}
function getTotalXpTable(maxLevel = 200) {
  const totalXp = [];
  let sum = 0;

  // level 1 requires 0 total XP
  totalXp.push(0);

  for (let level = 1; level < maxLevel; level++) {
    const xpNeeded = xpForLevel(level);
    sum += Math.round(xpNeeded);
    totalXp.push(sum);
  }

  return totalXp;
}
export const XP_TABLE = getTotalXpTable()

export interface GatherType {
  name: string;
  image?: string;
  duration: number;
  xpPerAction: number;
  requiredLevel: number;
  offlineEfficiency?: number;
}

export type GatherConfig = Record<string, GatherType>;
/**
 * Woodcutting resources configuration
 */
export const WOOD_TYPES: GatherConfig = {
  pine: {
    name: 'Pine',
    image: pineImg,
    duration: 3000,
    xpPerAction: 10,
    requiredLevel: 1,
  },
  oak: {
    name: 'Oak',
    image: oakImg,
    duration: 6000,
    xpPerAction: 15,
    requiredLevel: 5,
  },
  birch: {
    name: 'Birch',
    image: birchImg,
    duration: 7000,
    xpPerAction: 22,
    requiredLevel: 10,
  },
  ash: {
    name: 'Ash',
    image: ashImg,
    duration: 7500,
    xpPerAction: 31,
    requiredLevel: 15,
  },
  elm: {
    name: 'Elm',
    image: elmImg,
    duration: 8000,
    xpPerAction: 42,
    requiredLevel: 20,
  },
  maple: {
    name: 'Maple',
    image: mapleImg,
    duration: 8500,
    xpPerAction: 55,
    requiredLevel: 25,
  },
  spruce: {
    name: 'Spruce',
    image: spruceImg,
    duration: 9000,
    xpPerAction: 70,
    requiredLevel: 30,
  },
  willow: {
    name: 'Willow',
    image: willowImg,
    duration: 10000,
    xpPerAction: 95,
    requiredLevel: 40,
  },
  ebony: {
    name: 'Ebony',
    image: ebonyImg,
    duration: 10500,
    xpPerAction: 130,
    requiredLevel: 50,
  },
  mahogany: {
    name: 'Mahogany',
    image: mahoganyImg,
    duration: 11000,
    xpPerAction: 175,
    requiredLevel: 60,
  },
  teak: {
    name: 'Teak',
    image: teakImg,
    duration: 12000,
    xpPerAction: 302,
    requiredLevel: 80,
  },
  pounceOak: {
    name: 'Pounce Oak',
    image: pounceOakImg,
    duration: 13000,
    xpPerAction: 1260,
    requiredLevel: 150,
  },
  voidWhisker: {
    name: 'Void Whisker',
    image: voidWhiskerImg,
    duration: 15000,
    xpPerAction: 2660,
    requiredLevel: 200,
  },
} as const;

/**
 * Mining resources configuration
 */
export const ORE_TYPES: GatherConfig = {
  copperOre: {
    name: 'Copper Ore',
    image: voidWhiskerImg,
    duration: 1500,
    xpPerAction: 8,
    requiredLevel: 1,
    offlineEfficiency: 0.5,
  },
  tinOre: {
    name: 'Tin Ore',
    image: voidWhiskerImg,
    duration: 1500,
    xpPerAction: 8,
    requiredLevel: 1,
    offlineEfficiency: 0.5,
  },
  ironOre: {
    name: 'Iron Ore',
    image: voidWhiskerImg,
    duration: 3000,
    xpPerAction: 20,
    requiredLevel: 15,
    offlineEfficiency: 0.5,
  },
  coal: {
    name: 'Coal',
    image: voidWhiskerImg,
    duration: 4000,
    xpPerAction: 30,
    requiredLevel: 30,
    offlineEfficiency: 0.5,
  },
  goldOre: {
    name: 'Gold Ore',
    image: voidWhiskerImg,
    duration: 5000,
    xpPerAction: 50,
    requiredLevel: 40,
    offlineEfficiency: 0.5,
  },
  mithrilOre: {
    name: 'Mithril Ore',
    image: voidWhiskerImg,
    duration: 8000,
    xpPerAction: 80,
    requiredLevel: 55,
    offlineEfficiency: 0.5,
  },
} as const;

export type OreType = keyof typeof ORE_TYPES;

/**
 * Fishing resources configuration
 */
export const FISH_TYPES = {
  shrimp: {
    name: 'Shrimp',
    duration: 2000,
    xpPerAction: 10,
    requiredLevel: 1,
    offlineEfficiency: 0.5,
  },
  sardine: {
    name: 'Sardine',
    duration: 2500,
    xpPerAction: 15,
    requiredLevel: 5,
    offlineEfficiency: 0.5,
  },
  salmon: {
    name: 'Salmon',
    duration: 4000,
    xpPerAction: 40,
    requiredLevel: 30,
    offlineEfficiency: 0.5,
  },
  tuna: {
    name: 'Tuna',
    duration: 5000,
    xpPerAction: 55,
    requiredLevel: 35,
    offlineEfficiency: 0.5,
  },
  lobster: {
    name: 'Lobster',
    duration: 7000,
    xpPerAction: 75,
    requiredLevel: 40,
    offlineEfficiency: 0.5,
  },
  shark: {
    name: 'Shark',
    duration: 9000,
    xpPerAction: 110,
    requiredLevel: 76,
    offlineEfficiency: 0.5,
  },
} as const;

export type FishType = keyof typeof FISH_TYPES;

/**
 * Feature unlocks based on levels
 */
export const UNLOCKS = {
  autoChop: {
    requiredLevel: 10,
    skillName: 'woodcutting',
    description: 'Unlock auto-chopping',
  },
  autoMine: {
    requiredLevel: 10,
    skillName: 'mining',
    description: 'Unlock auto-mining',
  },
  autoFish: {
    requiredLevel: 10,
    skillName: 'fishing',
    description: 'Unlock auto-fishing',
  },
} as const;


export type SkillCode = 'wc' | 'ck' | 'fsh' | 'mn';
export type SkillName = 'woodcutting' | 'fishing' | 'mining';

export const skillMap: Map<SkillCode, SkillName> = new Map([
  ['wc', 'woodcutting'],
  ['fsh', 'fishing'],
  ['mn', 'mining'],
]);

export const skillReverseMap = new Map<SkillName, SkillCode>(
  Array.from(skillMap, ([code, name]) => [name, code])
);

export const ALL_RESOURCES: GatherConfig = {
  ...WOOD_TYPES,
  ...ORE_TYPES,
  ...FISH_TYPES,
} as const;

export type ResourceType = keyof typeof ALL_RESOURCES;

export const SKILL_RESOURCES = {
  woodcutting: WOOD_TYPES,
  mining: ORE_TYPES,
  fishing: FISH_TYPES,
} as const;
