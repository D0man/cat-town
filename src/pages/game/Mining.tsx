// pages/game/Woodcutting.tsx

import { SkillBlock } from "@/components/Gathering/SkillBlock";
import { ORE_TYPES } from "@/constants";

export function Mining() {
    return <SkillBlock name="mining" resources={ORE_TYPES} />
}
