
import type { SkillName } from "@/constants";
import { getXpForNextLevel, getXpProgress } from "@/calculations";
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
    console.log(progressPercentage, currentProgress)

    return (
        <div className="level-card">
            {imageUrl ? <img src={imageUrl} alt={`Level ${levelNumber}`} className="level-image" /> : skillName}

            <div className="level-info">
                <h3>Level {levelNumber}</h3>

                <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-blue-500 h-4 transition-all duration-100"
                            style={{ width: `${progressPercentage * 100}%` }}
                        />
                    </div>
                </div>

                <p className="progress-text">
                    {currentProgress} / {nextLevelExp}
                </p>
            </div>
        </div>
    );
};