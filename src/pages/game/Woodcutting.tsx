// pages/game/Woodcutting.tsx

import { GatheringCard } from "@/components/GatheringCard";


export function Woodcutting() {
    return (
        <>
            <div>Woodcuting Screen</div>
            <GatheringCard gatheringSkill="Woodcuting" gatheringItem="Oak" isAuto={true} duration={20000} onGather={() => console.log('YO!')}></GatheringCard>
        </>
    );
}
