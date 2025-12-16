// pages/game/Woodcutting.tsx

// import { useEffect } from "react";
// import { LevelCard } from "@components/LevelCard";
// import { useGameStore } from "@stores/gameStore";
// import { useUserStore } from "@stores/userStore"
// import { GatherItemCard } from "@components/Gathering/GatherItemCard";
// import { InfoCard } from "@components/Gathering/InfoCard";
// import { GatherType, ORE_TYPES } from "@/constants"
// import { camelCaseString, getNextRequiredLevel } from "@/helpers";
// import { BlockedResource } from "@components/Gathering/BlockedResource";
export function Mining() {
    // const mnLevel = useGameStore(state => state.mnLevel);
    // const mnExp = useGameStore(state => state.mnExp);
    // const actionName = useGameStore(state => state.actionName);

    // // Get actions separately (no selector, safe)
    // const { loadSkill, updateExp, updateAction, addItem } = useGameStore();
    // const currentUser = useUserStore(state => state.currentUser);
    // const userId = currentUser?.id;

    // const resources = ORE_TYPES;
    // const requiredLevel = getNextRequiredLevel(resources, mnLevel)
    // const activeResources = actionName
    //     ? ORE_TYPES[camelCaseString(actionName)]
    //     : null;

    // const handleClick = (resource: string) => {
    //     if (userId) {
    //         updateAction(userId, 'Mining', resource)
    //         console.log('YO!')
    //     }
    // }
    // const handleGather = (user: number, resource: GatherType) => {
    //     updateExp(user || 0, 'mn', resource.xpPerAction)
    //     addItem(user, resource.name + 'item', 1)

    // }

    // useEffect(() => {
    //     if (userId) {
    //         loadSkill(userId, 'mn');
    //     }
    // }, [userId]);

    return (
        <>
            {/* <div>Woodcuting Screen</div>
            <LevelCard skillName="Mining" levelNumber={mnLevel} currentProgress={mnExp || 0} />
            {activeResources && (
                <InfoCard
                    skill="Mining"
                    actionName={activeResources.name}
                    duration={activeResources.duration}
                    onTimesEnd={() => handleGather(userId || 0, activeResources)}
                />
            )}
            <div className="flex flex-wrap m-20">
                {Object.entries(resources).map(([key, resource]) => (

                    (requiredLevel !== null && resource.requiredLevel < requiredLevel) ?
                        <GatherItemCard key={key} gather={resource} isActive={actionName === resource.name} onClick={() => handleClick(resource.name)} /> : null
                ))}

                {requiredLevel && <BlockedResource requiredLevel={requiredLevel} />
                }
            </div> */}
            mining
        </>
    );
}