// stores/gameStore.ts
import { create } from 'zustand'
import { db } from '@/db';
import { XP_TABLE, skillMap, SkillCode } from '@/constants';

type SkillState = {
    [K in SkillCode as `${K}Level`]: number;
} & {
    [K in SkillCode as `${K}Exp`]: number;
};

interface SkillActions {
    loadSkill: (userId: number, skillCode: SkillCode) => Promise<void>;
    updateExp: (userId: number, skillCode: SkillCode, expGain: number) => Promise<void>;
    loadAllSkills: (userId: number) => Promise<void>;
}

type SkillStore = SkillState & SkillActions;

const createInitialState = (): SkillState => {
    const state = {} as SkillState;

    for (const [code] of skillMap) {
        state[`${code}Level` as keyof SkillState] = 1;
        state[`${code}Exp` as keyof SkillState] = 0;
    }

    return state;
};

export const useGameStore = create<SkillStore>((set, get) => ({
    ...createInitialState(),

    loadSkill: async (userId: number, skillCode: SkillCode) => {
        const skillName = skillMap.get(skillCode);
        if (!skillName) return;

        const skill = await db.skills.where({
            userId,
            skillName: skillName.toLowerCase()
        }).first();

        if (skill) {
            set({
                [`${skillCode}Level`]: skill.level,
                [`${skillCode}Exp`]: skill.exp,
            } as Partial<SkillState>);
        } else {
            set({
                [`${skillCode}Level`]: 1,
                [`${skillCode}Exp`]: 0,
            } as Partial<SkillState>);
        }
    },

    loadAllSkills: async (userId: number) => {
        const promises = Array.from(skillMap.keys()).map(code =>
            get().loadSkill(userId, code)
        );
        await Promise.all(promises);
    },

    updateExp: async (userId: number, skillCode: SkillCode, expGain: number) => {
        const skillName = skillMap.get(skillCode);
        if (!skillName) return;

        const currentExp = get()[`${skillCode}Exp` as keyof SkillState] as number;
        const currentLevel = get()[`${skillCode}Level` as keyof SkillState] as number;

        const newExp = currentExp + expGain;

        let level = currentLevel;
        while (level < XP_TABLE.length && newExp >= XP_TABLE[level]) {
            level++;
        }

        set({
            [`${skillCode}Exp`]: newExp,
            [`${skillCode}Level`]: level,
        } as Partial<SkillState>);

        await db.skills.put({
            userId,
            skillName: skillName.toLowerCase(),
            level,
            exp: newExp,
        });
    },
}));
