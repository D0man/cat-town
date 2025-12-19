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
    const { loadAllSkills, updateExp, addItem, loadActionSkillName } = useGameStore();
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
                // Wait for lastOnline to actually load
                await loadAllSkills(userId)
                await loadLastOnline(userId);
                await loadActionSkillName(userId)

                const currentLastOnline = useUserStore.getState().lastOnline;

                const currentActionName = useGameStore.getState().actionName;
                if (currentActionName !== null) {
                    if (!wasOfflineProgressGiven) {
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
            addItem(user, resource.name + 'item', quanity)
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
