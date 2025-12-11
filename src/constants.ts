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

/**
 * XP table for levels 1-99
 * Each index represents the total XP needed to reach that level
 * Adjust this curve to make leveling faster/slower
 */
export const XP_TABLE = [
  0,       // Level 1
  100000000,     // Level 2
  250000000,     // Level 3
  500000000,     // Level 4
  100000000,    // Level 5
  175000000,    // Level 6
  280000000,    // Level 7
  420000000,    // Level 8
  600000000,    // Level 9
  830000000,    // Level 10
];
export interface GatherType {
  name: string;
  image: string;
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
  ash: {
    name: 'Ash',
    image: ashImg,
    duration: 8000,
    xpPerAction: 10,
    requiredLevel: 1,
  },
  birch: {
    name: 'Birch',
    image: birchImg,
    duration: 10000,
    xpPerAction: 15,
    requiredLevel: 5,
  },
  ebony: {
    name: 'Ebony',
    image: ebonyImg,
    duration: 30000,
    xpPerAction: 20,
    requiredLevel: 10,
  },
  elm: {
    name: 'Elm',
    image: elmImg,
    duration: 35000,
    xpPerAction: 25,
    requiredLevel: 15,
  },
  mahogany: {
    name: 'Mahogany',
    image: mahoganyImg,
    duration: 40000,
    xpPerAction: 30,
    requiredLevel: 20,
  },
  maple: {
    name: 'Maple',
    image: mapleImg,
    duration: 45000,
    xpPerAction: 35,
    requiredLevel: 25,
  },
  oak: {
    name: 'Oak',
    image: oakImg,
    duration: 50000,
    xpPerAction: 40,
    requiredLevel: 30,
  },
  pine: {
    name: 'Pine',
    image: pineImg,
    duration: 55000,
    xpPerAction: 45,
    requiredLevel: 35,
  },
  pounceOak: {
    name: 'Pounce Oak',
    image: pounceOakImg,
    duration: 60000,
    xpPerAction: 50,
    requiredLevel: 40,
  },
  spruce: {
    name: 'Spruce',
    image: spruceImg,
    duration: 65000,
    xpPerAction: 55,
    requiredLevel: 45,
  },
  teak: {
    name: 'Teak',
    image: teakImg,
    duration: 70000,
    xpPerAction: 60,
    requiredLevel: 50,
  },
  voidWhisker: {
    name: 'Void Whisker',
    image: voidWhiskerImg,
    duration: 75000,
    xpPerAction: 65,
    requiredLevel: 55,
  },
  willow: {
    name: 'Willow',
    image: willowImg,
    duration: 80000,
    xpPerAction: 70,
    requiredLevel: 60,
  },
} as const;

/**
 * Mining resources configuration
 */
export const ORE_TYPES = {
  copper: {
    name: 'Copper Ore',
    duration: 1500,
    xpPerAction: 8,
    requiredLevel: 1,
    offlineEfficiency: 0.5,
  },
  tin: {
    name: 'Tin Ore',
    duration: 1500,
    xpPerAction: 8,
    requiredLevel: 1,
    offlineEfficiency: 0.5,
  },
  iron: {
    name: 'Iron Ore',
    duration: 3000,
    xpPerAction: 20,
    requiredLevel: 15,
    offlineEfficiency: 0.5,
  },
  coal: {
    name: 'Coal',
    duration: 4000,
    xpPerAction: 30,
    requiredLevel: 30,
    offlineEfficiency: 0.5,
  },
  gold: {
    name: 'Gold Ore',
    duration: 5000,
    xpPerAction: 50,
    requiredLevel: 40,
    offlineEfficiency: 0.5,
  },
  mithril: {
    name: 'Mithril Ore',
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


export type SkillCode = 'wc' | 'ck' | 'fsh' | 'mn' | 'sm';
export type SkillName = 'Woodcutting' | 'Cooking' | 'Fishing' | 'Mining' | 'Smithing';

export const skillMap: Map<SkillCode, SkillName> = new Map([
  ['wc', 'Woodcutting'],
  ['ck', 'Cooking'],
  ['fsh', 'Fishing'],
  ['mn', 'Mining'],
  ['sm', 'Smithing']
]);