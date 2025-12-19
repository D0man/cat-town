
import { SkillBlock } from "@/components/Gathering/SkillBlock";
import { WOOD_TYPES } from "@/constants";

export function Woodcutting() {
    return <SkillBlock name="woodcutting" resources={WOOD_TYPES} />
}
