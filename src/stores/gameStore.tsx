// stores/gameStore.ts
import { create } from 'zustand'
import { db } from '@/db';
import { XP_TABLE, skillMap, SkillCode, SkillName } from '@/constants';

type SkillState = {
    [K in SkillCode as `${K}Level`]: number;
} & {
    [K in SkillCode as `${K}Exp`]: number;
};

interface SkillVariable {
    activeSkill: null | SkillName;
    actionName: null | string;
    inventory: {}
}
interface SkillActions {
    loadSkill: (userId: number, skillCode: SkillCode) => Promise<void>;
    updateExp: (userId: number, skillCode: SkillCode, expGain: number) => Promise<void>;
    loadAllSkills: (userId: number) => Promise<void>;
    loadActionSkillName: (userId: number) => Promise<void>;
    updateAction: (userId: number, skillName: string, actionName: string) => Promise<void>;
    addItem: (userId: number, ItemName: string, quanity: number) => Promise<void>;
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
    activeSkill: null,
    actionName: null,
    inventory: {},

    addItem: async (userId, itemName: string, quanity: number = 1) => {
        set((state) => {
            if (state.inventory.hasOwnProperty(itemName)) {
                return { inventory: { ...state.inventory, [itemName]: quanity } }
            } else {

                return {
                    inventory: {
                        ...state.inventory,
                        // @ts-ignore
                        [itemName]: state.inventory[itemName] + quanity,
                    },
                };
            }
        })
        const item = await db.inventory.get(itemName);
        await db.inventory.put({
            userId,
            itemId: itemName,
            quantity: (item?.quantity || 0) + quanity,
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
        }

    },

    loadAllSkills: async (userId: number) => {
        const promises = Array.from(skillMap.keys()).map(code =>
            get().loadSkill(userId, code)
        );
        await Promise.all(promises);
    },

    loadActionSkillName: async (userId: number) => {
        const userAction = await db.skills
            .where('userId')
            .equals(userId)
            .and(skill => skill.active === true).toArray()
        if (userAction.length) {
            const skillAction = userAction[0].actionName
            const skillName = userAction[0].skillName as SkillName
            set({ actionName: skillAction, activeSkill: skillName })
        }
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

        const updateDb = await db.skills.update(
            [userId, skillName.toLowerCase()]
            , {
                level,
                exp: newExp,
            });
        if (!updateDb) {
            const existingSkill = await db.skills.get([userId, skillName.toLowerCase()]);

            await db.skills.put({
                ...(existingSkill ?? {}),
                userId,
                skillName: skillName.toLowerCase(),
                level,
                exp: newExp,
            });
        }
    },
    updateAction: async (userId: number, skillName, actionName) => {
        await db.skills
            .where('userId')
            .equals(userId)
            .and(skill => skill.active === true)
            .modify({ active: false });
        set({ actionName: actionName, activeSkill: skillName as SkillName })
        await db.skills.update([userId, skillName.toLowerCase()], { active: true, actionName: actionName });
    },
}));
