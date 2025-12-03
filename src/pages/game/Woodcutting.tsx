// pages/game/Woodcutting.tsx

import { useEffect } from "react";
import { GatheringInfoCard } from "@/components/Gathering/GatheringInfoCard";
import { LevelCard } from "@/components/LevelCard";
import { useGameStore } from "@stores/gameStore";
import { useUserStore } from "@stores/userStore"
import { GatherItemCard } from "@/components/Gathering/GatherItemCard";
import { WOOD_TYPES } from "@/constants"
export function Woodcutting() {
    const { wcLevel, wcExp, updateExp, loadSkill } = useGameStore();
    const currentUser = useUserStore(state => state.currentUser);
    const userId = currentUser?.id;
    const resources = WOOD_TYPES
    useEffect(() => {
        if (userId) {
            loadSkill(userId, 'wc');
        }
    }, [userId]);
    return (
        <>
            <div>Woodcuting Screen</div>
            <LevelCard skillName="Woodcutting" levelNumber={wcLevel} currentProgress={wcExp} />
            <GatheringInfoCard gatheringSkill="Woodccuting" gatheringItem="Oak" isAuto={true} duration={1000} onGather={() => updateExp(userId || 0, 'wc', 20)}></GatheringInfoCard>
            {Object.entries(resources).map(([key, resource]) => (
                <GatherItemCard key={key} gather={resource} />
            ))}
        </>
    );
}
