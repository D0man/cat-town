// pages/game/Woodcutting.tsx

import { useEffect } from "react";
import { LevelCard } from "@components/LevelCard";
import { useGameStore } from "@stores/gameStore";
import { useUserStore } from "@stores/userStore"
import { GatherItemCard } from "@components/Gathering/GatherItemCard";
// import { InfoCard } from "@components/Gathering/InfoCard";
import { WOOD_TYPES } from "@/constants"
import { getNextRequiredLevel } from "@/helpers";
import { BlockedResource } from "@components/Gathering/BlockedResource";
export function Woodcutting() {
    const wcLevel = useGameStore(state => state.wcLevel);
    const wcExp = useGameStore(state => state.wcExp);
    const actionName = useGameStore(state => state.actionName);

    // Get actions separately (no selector, safe)
    const { loadSkill, updateAction } = useGameStore();
    const currentUser = useUserStore(state => state.currentUser);
    const userId = currentUser?.id;

    const resources = WOOD_TYPES;
    const requiredLevel = getNextRequiredLevel(resources, wcLevel)
    // const activeResources = actionName
    //     ? WOOD_TYPES[camelCaseString(actionName)]
    //     : null;
    console.log(actionName, 'actionName')

    const handleClick = (resource: string) => {
        if (userId) {
            updateAction(userId, 'Woodcutting', resource)
        }
    }
    // const handleGather = (user: number, resource: GatherType) => {
    //     updateExp(user || 0, 'wc', resource.xpPerAction)
    //     addItem(user, resource.name + 'item', 1)

    // }

    useEffect(() => {
        if (userId) {
            loadSkill(userId, 'wc');
        }
    }, [userId]);

    return (
        <>
            <div>Woodcuting Screen</div>
            <LevelCard skillName="Woodcutting" levelNumber={wcLevel} currentProgress={wcExp || 0} />
            {/* {activeResources && (
                <InfoCard
                    skill="Woodcutting"
                    actionName={activeResources.name}
                    duration={activeResources.duration}
                    onTimesEnd={() => handleGather(userId || 0, activeResources)}
                />
            )} */}
            <div className="flex flex-wrap m-20">
                {Object.entries(resources).map(([key, resource]) => (

                    (requiredLevel !== null && resource.requiredLevel < requiredLevel) ?
                        <GatherItemCard key={key} gather={resource} isActive={actionName === resource.name} onClick={() => handleClick(resource.name)} /> : null
                ))}

                {requiredLevel && <BlockedResource requiredLevel={requiredLevel} />
                }
            </div>
        </>
    );
}