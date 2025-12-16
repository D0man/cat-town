
import type { SkillName } from "@/constants";
import { getXpForNextLevel, getXpProgress } from "@/calculations";
import { ProgressBar } from "./ProgressBar";
interface LevelCardProps {
    skillName: SkillName
    levelNumber: number;
    imageUrl?: string;
    currentProgress: number;
}

export const LevelCard: React.FC<LevelCardProps> = ({
    skillName,
    levelNumber,
    imageUrl,
    currentProgress,
}) => {
    const progressPercentage = getXpProgress(currentProgress, levelNumber);
    const nextLevelExp = getXpForNextLevel(levelNumber)

    return (
        <div className="mb-4">
            {imageUrl ? <img src={imageUrl} alt={`Level ${levelNumber}`} className="level-image" /> : skillName}
            <div>
                <h3>Level {levelNumber}</h3>
                <ProgressBar progress={progressPercentage * 100} activeColor="bg-blue-500" />
                <p className="text-right text-xs text-blue-400">
                    {currentProgress} / {nextLevelExp}
                </p>
            </div>
        </div>
    );
};