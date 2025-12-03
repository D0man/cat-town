// stores/woodcuttingStore.ts
import { create } from 'zustand'
import { db } from '@/db';
import { XP_TABLE } from '@/constants';

export interface WoodcuttingStore {
    woodcuttingLevel: number;
    woodcuttingExp: number;
    loadSkill: (userId: number) => Promise<void>;
    updateExp: (userId: number, expGain: number) => Promise<void>;
}

export const useWoodcutingStore = create<WoodcuttingStore>((set, get) => ({
    woodcuttingLevel: 0,
    woodcuttingExp: 0,

    loadSkill: async (userId: number) => {
        const skill = await db.skills.where({ userId, skillName: 'woodcutting' }).first();
        console.log("skill", skill)
        if (skill) {
            set({ woodcuttingLevel: skill.level, woodcuttingExp: skill.exp });
        } else {
            set({ woodcuttingLevel: 1, woodcuttingExp: 0 })
        }
    },

    updateExp: async (userId: number, expGain: number) => {
        const { woodcuttingExp, woodcuttingLevel } = get();
        const newExp = woodcuttingExp + expGain;

        let currentLevel = woodcuttingLevel;
        while (currentLevel < XP_TABLE.length && newExp >= XP_TABLE[currentLevel]) {
            currentLevel++;
        }

        set({ woodcuttingExp: newExp, woodcuttingLevel: currentLevel });

        await db.skills.put({
            userId,
            skillName: 'woodcutting',
            level: currentLevel,
            exp: newExp,
        });
    },
}))
