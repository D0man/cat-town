// pages/game/Woodcutting.tsx

import { useEffect } from "react";
import { GatheringInfoCard } from "@/components/Gathering/GatheringInfoCard";
import { LevelCard } from "@/components/LevelCard";
import { useGameStore } from "@stores/gameStore";
import { useUserStore } from "@stores/userStore"
import { GatherItemCard } from "@/components/Gathering/GatherItemCard";
import { WOOD_TYPES } from "@/constants"
import { camelCaseString } from "@/helpers";
export function Woodcutting() {
    const wcLevel = useGameStore(state => state.wcLevel);
    const wcExp = useGameStore(state => state.wcExp);
    const actionName = useGameStore(state => state.actionName);

    // Get actions separately (no selector, safe)
    const { loadSkill, updateExp, updateAction } = useGameStore();

    const currentUser = useUserStore(state => state.currentUser);
    const userId = currentUser?.id;

    const resources = WOOD_TYPES;
    const activeResources = actionName
        ? WOOD_TYPES[camelCaseString(actionName)]
        : null;

    const handleClick = (resource: string) => {
        console.log('yo!')
        if (userId) {
            updateAction(userId, 'Woodcutting', resource)
        }
    }

    useEffect(() => {
        if (userId) {
            loadSkill(userId, 'wc');
        }
        console.log('test', actionName)
    }, [userId]);

    return (
        <>
            <div>Woodcuting Screen</div>
            <LevelCard skillName="Woodcutting" levelNumber={wcLevel} currentProgress={wcExp} />
            {activeResources && (
                <GatheringInfoCard
                    gatheringSkill="Woodcutting"
                    gatheringName={activeResources.name}
                    isAuto={false}
                    duration={activeResources.duration}
                    onGather={() => updateExp(userId || 0, 'wc', activeResources.xpPerAction)}
                />
            )}
            <div className="flex flex-wrap m-20">
                {Object.entries(resources).map(([key, resource]) => (
                    <GatherItemCard key={key} gather={resource} onClick={() => handleClick(resource.name)} />
                ))}
            </div>
        </>
    );
}