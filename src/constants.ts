export const WOOD_TYPES = {
    oak: {
        name: 'Oak',
        chopDuration: 2000,      // 2 seconds
        xpPerLog: 10,
        requiredLevel: 1,
        offlineEfficiency: 0.5,  // 50% gains when offline
    },
    maple: {
        name: 'Maple',
        chopDuration: 3000,
        xpPerLog: 25,
        requiredLevel: 15,
        offlineEfficiency: 0.5,
    },
    willow: {
        name: 'Willow',
        chopDuration: 1500,
        xpPerLog: 15,
        requiredLevel: 30,
        offlineEfficiency: 0.5,
    },
    yew: {
        name: 'Yew',
        chopDuration: 5000,
        xpPerLog: 50,
        requiredLevel: 60,
        offlineEfficiency: 0.5,
    },
    magic: {
        name: 'Magic',
        chopDuration: 10000,
        xpPerLog: 100,
        requiredLevel: 75,
        offlineEfficiency: 0.5,
    },
} as const;

export type WoodType = keyof typeof WOOD_TYPES;

// XP required for each level (example curve)
export const XP_TABLE = [
    0,       // Level 1
    100,     // Level 2
    250,     // Level 3
    500,     // Level 4
    1000,    // Level 5
    1750,    // Level 6
    2800,    // Level 7
    4200,    // Level 8
    6000,    // Level 9
    8300,    // Level 10
    11200,   // Level 11
    14800,   // Level 12
    19200,   // Level 13
    24500,   // Level 14
    30900,   // Level 15
    38500,   // Level 16
    47500,   // Level 17
    58000,   // Level 18
    70200,   // Level 19
    84300,   // Level 20
    100500,  // Level 21
    119000,  // Level 22
    140000,  // Level 23
    163800,  // Level 24
    190700,  // Level 25
    221000,  // Level 26
    255000,  // Level 27
    293000,  // Level 28
    335500,  // Level 29
    382800,  // Level 30
];

export const UNLOCKS = {
    autoChop: {
        requiredLevel: 10,
        skillName: 'woodcutting',
    },
    // More unlocks...
};