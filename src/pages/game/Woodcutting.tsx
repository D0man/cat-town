// pages/game/Woodcutting.tsx

import { useEffect } from "react";
import { GatheringInfoCard } from "@/components/Gathering/GatheringInfoCard";
import { LevelCard } from "@/components/LevelCard";
import { useGameStore } from "@stores/gameStore";
import { useUserStore } from "@stores/userStore"
import { GatherItemCard } from "@/components/Gathering/GatherItemCard";
import { GatherType, WOOD_TYPES } from "@/constants"
import { camelCaseString, getNextRequiredLevel } from "@/helpers";
export function Woodcutting() {
    const wcLevel = useGameStore(state => state.wcLevel);
    const wcExp = useGameStore(state => state.wcExp);
    const actionName = useGameStore(state => state.actionName);

    // Get actions separately (no selector, safe)
    const { loadSkill, updateExp, updateAction, addItem } = useGameStore();
    const currentUser = useUserStore(state => state.currentUser);
    const userId = currentUser?.id;

    const resources = WOOD_TYPES;
    const requiredLevel = getNextRequiredLevel(resources, wcLevel)
    const activeResources = actionName
        ? WOOD_TYPES[camelCaseString(actionName)]
        : null;

    const handleClick = (resource: string) => {
        if (userId) {
            updateAction(userId, 'Woodcutting', resource)
            console.log('succesfull change resource action')
        }
    }
    const handleGather = (user: number, resource: GatherType) => {
        updateExp(user || 0, 'wc', resource.xpPerAction)
        addItem(user, resource.name + 'item')
        console.log('sucesfull gather ation')

    }

    useEffect(() => {
        if (userId) {
            loadSkill(userId, 'wc');
        }
    }, [userId]);

    return (
        <>
            <div>Woodcuting Screen</div>
            <LevelCard skillName="Woodcutting" levelNumber={wcLevel} currentProgress={wcExp || 0} />
            {activeResources && (
                <GatheringInfoCard
                    gatheringSkill="Woodcutting"
                    gatheringName={activeResources.name}
                    isAuto={false}
                    duration={activeResources.duration}
                    onGather={() => handleGather(userId || 0, activeResources)}
                />
            )}
            <div className="flex flex-wrap m-20">
                {Object.entries(resources).map(([key, resource]) => (

                    (requiredLevel !== null && resource.requiredLevel < requiredLevel) ?
                        <GatherItemCard key={key} gather={resource} onClick={() => handleClick(resource.name)} /> : null
                ))}

                {requiredLevel && <div className="pixeled piexeled-border pixeled-blue-500 p-4 text-center cursor-pointer bg-gray-50 min-w-45">
                    Next Level tree at{requiredLevel}
                </div>
                }
            </div>
        </>
    );
}