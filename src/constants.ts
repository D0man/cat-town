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
import Pinelog from '@assets/items/PineLog_32x32.png';

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
export const ORE_TYPES = {
  copperOre: {
    name: 'Copper Ore',
    duration: 3000,
    xpPerAction: 10,
    requiredLevel: 1,
  },

  tinOre: {
    name: 'Tin Ore',
    duration: 6000,
    xpPerAction: 15,
    requiredLevel: 5,
  },

  ironOre: {
    name: 'Iron Ore',
    duration: 7000,
    xpPerAction: 22,
    requiredLevel: 10,
  },

  leadOre: {
    name: 'Lead Ore',
    duration: 7500,
    xpPerAction: 31,
    requiredLevel: 15,
  },

  silverOre: {
    name: 'Silver Ore',
    duration: 8000,
    xpPerAction: 42,
    requiredLevel: 20,
  },

  goldOre: {
    name: 'Gold Ore',
    duration: 8500,
    xpPerAction: 55,
    requiredLevel: 25,
    isMilestone: true,
  },

  platinumOre: {
    name: 'Platinum Ore',
    duration: 9000,
    xpPerAction: 70,
    requiredLevel: 30,
  },

  obsidianOre: {
    name: 'Obsidian Ore',
    duration: 10000,
    xpPerAction: 95,
    requiredLevel: 40,
  },

  mithrilOre: {
    name: 'Mithril Ore',
    duration: 10500,
    xpPerAction: 130,
    requiredLevel: 50,
    isMilestone: true,
  },

  orichalcumOre: {
    name: 'Orichalcum Ore',
    duration: 11000,
    xpPerAction: 175,
    requiredLevel: 60,
  },

  adamantiteOre: {
    name: 'Adamantite Ore',
    duration: 11500,
    xpPerAction: 232,
    requiredLevel: 70,
  },

  runestoneOre: {
    name: 'Runestone Ore',
    duration: 12000,
    xpPerAction: 302,
    requiredLevel: 80,

  },

  mythrilOre: {
    name: 'Mythril Ore',
    duration: 15000,
    xpPerAction: 1260,
    requiredLevel: 150,
  },

  etherealCrystal: {
    name: 'Ethereal Crystal',
    duration: 19000,
    xpPerAction: 2660,
    requiredLevel: 200,
  },
} as const;

export type OreType = keyof typeof ORE_TYPES;

/**
 * Fishing resources configuration
 */
export const FISH_TYPES = {
  goldfish: {
    name: 'Goldfish',
    duration: 3000,
    xpPerAction: 10,
    requiredLevel: 1,
  },

  trout: {
    name: 'Trout',
    duration: 6000,
    xpPerAction: 15,
    requiredLevel: 5,
  },

  bass: {
    name: 'Bass',
    duration: 7000,
    xpPerAction: 22,
    requiredLevel: 10,
  },

  pike: {
    name: 'Pike',
    duration: 7500,
    xpPerAction: 31,
    requiredLevel: 15,
  },

  salmon: {
    name: 'Salmon',
    duration: 8000,
    xpPerAction: 42,
    requiredLevel: 20,
  },

  catfish: {
    name: 'Catfish',
    duration: 8500,
    xpPerAction: 55,
    requiredLevel: 25,
  },

  carp: {
    name: 'Carp',
    duration: 9000,
    xpPerAction: 70,
    requiredLevel: 30,
  },

  tuna: {
    name: 'Tuna',
    duration: 10000,
    xpPerAction: 95,
    requiredLevel: 40,
  },

  marlin: {
    name: 'Marlin',
    duration: 10500,
    xpPerAction: 130,
    requiredLevel: 50,
  },

  flounder: {
    name: 'Flounder',
    duration: 11000,
    xpPerAction: 175,
    requiredLevel: 60,
  },

  snapper: {
    name: 'Snapper',
    duration: 11500,
    xpPerAction: 232,
    requiredLevel: 70,
  },

  shark: {
    name: 'Shark',
    duration: 12000,
    xpPerAction: 302,
    requiredLevel: 80,
  },

  mythicKoi: {
    name: 'Mythic Koi',
    duration: 15000,
    xpPerAction: 1260,
    requiredLevel: 150,
  },

  dimensionalLeviathan: {
    name: 'Dimensional Leviathan',
    duration: 18000,
    xpPerAction: 2660,
    requiredLevel: 200,
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

interface Item {
  imgsrc: string;
  description: string;
  amount?: number;
  containerId?: number;
  price: number;
  id: string;
};


export const ITEMS: Record<string, Item> = {
  PineItem: {
    imgsrc: Pinelog,
    id: "PineItem",
    description: 'pine log',
    price: 1
  }
}