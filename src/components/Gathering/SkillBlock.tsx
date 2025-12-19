// pages/game/Woodcutting.tsx

import { useEffect } from "react";
import { LevelCard } from "@components/LevelCard";
import { useGameStore } from "@stores/gameStore";
import { useUserStore } from "@stores/userStore"
import { GatherItemCard } from "@components/Gathering/GatherItemCard";
import { GatherConfig, SkillName, skillReverseMap } from "@/constants"
import { getNextRequiredLevel } from "@/helpers";
import { BlockedResource } from "@components/Gathering/BlockedResource";

interface SkillBlockProps {
    name: SkillName;
    resources: GatherConfig;
}
export function SkillBlock({ name, resources }: SkillBlockProps) {
    const skillCode = skillReverseMap.get(name);
    const skillLevel = useGameStore(state => state[`${skillCode ?? 'wc'}Level`]);
    const skillExp = useGameStore(state => state[`${skillCode ?? 'wc'}Exp`]);
    const actionName = useGameStore(state => state.actionName);


    // Get actions separately (no selector, safe)
    const { loadSkill, updateAction } = useGameStore();
    const currentUser = useUserStore(state => state.currentUser);
    const userId = currentUser?.id;
    const requiredLevel = getNextRequiredLevel(resources, skillLevel)

    const handleClick = (resource: string) => {
        if (userId) {
            updateAction(userId, name, resource)
        }
    }

    useEffect(() => {
        if (userId && skillCode) {
            loadSkill(userId, skillCode);
        }
    }, [userId]);

    return (
        <>
            <div>{name} Screen</div>
            <LevelCard skillName={name} levelNumber={skillLevel} currentProgress={skillExp || 0} />
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