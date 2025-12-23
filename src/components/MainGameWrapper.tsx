import React, { useEffect, useState } from "react";
import { useGameStore } from "@stores/gameStore";
import { useUserStore } from "@stores/userStore"
import { GatherType, ALL_RESOURCES, skillReverseMap, SkillCode } from "@/constants"
import { InfoCard } from "@components/Gathering/InfoCard";
import { camelCaseString } from "@/helpers"
import { calculateOfflineProgressMultiplayer } from "@/calculations";
interface MainGameWrapperProps {
    children: React.ReactNode
}
export function MainGameWrapper({ children }: MainGameWrapperProps) {
    const { loadAllSkills, updateExp, addItem, loadActionSkillName, loadInventory } = useGameStore();
    const { currentUser, updateLastOnline, loadLastOnline } = useUserStore();
    const userId = currentUser?.id;
    const actionName = useGameStore(state => state.actionName);
    const activeSkill = useGameStore(state => state.activeSkill)
    const [wasOfflineProgressGiven, setWasOfflineProgressGiven] = useState(false)
    const activeResources = actionName
        ? ALL_RESOURCES[camelCaseString(actionName)]
        : null;



    useEffect(() => {
        if (userId) {
            const processOfflineGains = async () => {
                await Promise.all([
                    loadAllSkills(userId),
                    loadLastOnline(userId),
                    loadActionSkillName(userId),
                    loadInventory(userId)
                ]);
                const currentLastOnline = useUserStore.getState().lastOnline;
                const currentActionName = useGameStore.getState().actionName;

                if (currentActionName !== null) {
                    if (!wasOfflineProgressGiven && currentActionName) {
                        const resource = ALL_RESOURCES[camelCaseString(currentActionName)]
                        const multiplayer = calculateOfflineProgressMultiplayer(currentLastOnline, resource.duration)
                        handleGather(userId, resource, multiplayer)
                        setWasOfflineProgressGiven(true)
                    }
                }

            }
            processOfflineGains()
        }
    }, [userId]);

    const handleGather = async (user: number, resource: GatherType, quanity = 1) => {
        await loadActionSkillName(user)
        const activeSkill = useGameStore.getState().activeSkill;
        if (activeSkill) {
            const skillCode = skillReverseMap.get(activeSkill) as SkillCode

            updateExp(user || 0, skillCode, quanity * resource.xpPerAction)
            addItem(user, resource.name + 'Item', quanity)
            if (quanity > 1) {
                console.log('Byłeś offline i dostałeś expa:', quanity * resource.xpPerAction)
                updateLastOnline(user);
            }
        }
    }

    return (
        <div>MainGameWrapper

            {activeResources && (
                <InfoCard
                    skill={activeSkill}
                    actionName={activeResources.name}
                    duration={activeResources.duration}
                    onTimesEnd={() => handleGather(userId || 0, activeResources)}
                />
            )}
            {children}
        </div>

    )
}
