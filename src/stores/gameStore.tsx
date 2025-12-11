// stores/gameStore.ts
import { create } from 'zustand'
import { db } from '@/db';
import { XP_TABLE, skillMap, SkillCode } from '@/constants';

type SkillState = {
    [K in SkillCode as `${K}Level`]: number;
} & {
    [K in SkillCode as `${K}Exp`]: number;
};

interface SkillVariable {
    lastAction: null | string;
    actionName: null | string;
    inventory: {}
}
interface SkillActions {
    loadSkill: (userId: number, skillCode: SkillCode) => Promise<void>;
    updateExp: (userId: number, skillCode: SkillCode, expGain: number) => Promise<void>;
    loadAllSkills: (userId: number) => Promise<void>;
    updateAction: (userId: number, skillName: string, actionName: string) => Promise<void>;
    addItem: (userId: number, ItemId: string) => Promise<void>;
}

type SkillStore = SkillState & SkillActions & SkillVariable;
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
    lastAction: null,
    actionName: null,
    inventory: {},

    addItem: async (userId, itemName: string) => {
        set((state) => {
            if (state.inventory.hasOwnProperty(itemName)) {
                return { inventory: { ...state.inventory, [itemName]: 1 } }
            } else {

                return {
                    inventory: {
                        ...state.inventory,
                        // @ts-ignore
                        [itemName]: state.inventory[itemName] + 1,
                    },
                };
            }
        })
        const item = await db.inventory.get(itemName);
        await db.inventory.put({
            userId,
            itemId: itemName,
            quantity: (item?.quantity || 0) + 1,
        });
    },

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
            set({ actionName: skill?.actionName })
        } else {
            set({
                [`${skillCode}Level`]: 1,
                [`${skillCode}Exp`]: 0,
            } as Partial<SkillState>);
            set({ actionName: null })
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
    updateAction: async (userId: number, skillName, actionName) => {
        await db.skills
            .where('userId')
            .equals(userId)
            .and(skill => skill.active === true)
            .modify({ active: false, startTime: null });
        const timeNow = Date.now()
        set({ actionName: actionName })
        await db.skills.update([userId, skillName.toLowerCase()], { active: true, actionName: actionName, startTime: timeNow });
    },
}));
