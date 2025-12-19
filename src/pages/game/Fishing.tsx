
import { SkillBlock } from "@/components/Gathering/SkillBlock";
import { FISH_TYPES } from "@/constants";

export function Fishing() {
    return <SkillBlock name="fishing" resources={FISH_TYPES} />
}