// stores/gameStore.ts
import { create } from 'zustand'
import { db } from '@/db';
import { XP_TABLE, skillMap, SkillCode, SkillName } from '@/constants';

type SkillState = {
    [K in SkillCode as `${K}Level`]: number;
} & {
    [K in SkillCode as `${K}Exp`]: number;
};
//TodO make item only one source
interface InventoryItem {
    itemId: string;
    amount: number;
    containerId: number;
    position: number;
}
type Inventory = Record<string, InventoryItem>


interface SkillVariable {
    activeSkill: null | SkillName;
    actionName: null | string;
    inventory: Inventory
}
interface SkillActions {
    loadSkill: (userId: number, skillCode: SkillCode) => Promise<void>;
    updateExp: (userId: number, skillCode: SkillCode, expGain: number) => Promise<void>;
    loadAllSkills: (userId: number) => Promise<void>;
    loadActionSkillName: (userId: number) => Promise<void>;
    updateAction: (userId: number, skillName: string, actionName: string) => Promise<void>;
    addItem: (userId: number, ItemName: string, quanity: number) => Promise<void>;
    loadInventory: (userId: number) => Promise<void>;
    updateInventoryPosition: (userId: number, inventory: Inventory) => Promise<void>;
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

    addItem: async (userId, itemName: string, quantity: number = 1, containerId: number = 1) => {
        set((state) => {
            if (state.inventory.hasOwnProperty(itemName)) {
                return {
                    inventory: {
                        ...state.inventory,
                        [itemName]: {
                            ...state.inventory[itemName],
                            amount: state.inventory[itemName].amount + quantity
                        }
                    }
                };
            } else {
                const maxPosition = Object.values(state.inventory).reduce(
                    (max, item) => item.containerId === 1 && item.position > max ? item.position : max, 0);
                return {
                    inventory: {
                        ...state.inventory,
                        [itemName]: {
                            itemId: itemName,
                            amount: quantity,
                            containerId: 1,
                            position: maxPosition + 1,
                        }
                    },
                };
            }
        })
        const item = await db.inventory.get([userId, itemName]);
        await db.inventory.put({
            userId,
            itemId: itemName,
            amount: (item?.amount || 0) + quantity,
            containerId: containerId,
            position: item?.position || get().inventory[itemName]?.position || 1
        });
    },
    loadInventory: async (userId: number) => {
        try {
            const loadedInventory = await db.inventory
                .where('userId')
                .equals(userId).toArray()
            console.log(loadedInventory, 'loadedInventory!')
            const inventoryObject = loadedInventory.reduce((acc, item) => {
                acc[item.itemId] = {
                    itemId: item.itemId,
                    amount: item.amount,
                    containerId: item.containerId,
                    position: item.position
                };
                return acc;
            }, {} as Record<string, InventoryItem>);

            // Update Zustand store
            set({ inventory: inventoryObject });
        }
        catch (error) {
            console.error('Failed to load inventory:', error);
            throw error;
        }

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
            if (skill.active) {
                set({ actionName: skill.actionName, activeSkill: skillName as SkillName })
            }
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
    updateInventoryPosition: async (userId: number, inventory: Inventory) => {
        set({ inventory });

        // Sync all items to database with new positions
        const promises = Object.values(inventory).map(item =>
            db.inventory.put({
                userId,
                itemId: item.itemId,
                amount: item.amount,
                containerId: item.containerId,
                position: item.position
            })
        );
        await Promise.all(promises);
    },
}));
