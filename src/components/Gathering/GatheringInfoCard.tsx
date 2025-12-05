// components/GatheringCard.tsx
import { useState, useEffect, useCallback } from 'react';
import ThreeStateButton from '@components/ThreeStateButton';

interface GatheringCardProps {
    gatheringSkill: string;    // e.g., "Woodcutting"
    gatheringName: string | null;     // e.g., "Oak"
    isAuto?: boolean;           // Auto-gather enabled? (not used yet, for future)
    duration: number;          // Duration in milliseconds
    onGather: () => void;      // Callback when gather button is clicked
}

export function GatheringInfoCard({
    gatheringSkill,
    gatheringName,
    isAuto,
    duration,
    onGather,
}: GatheringCardProps) {
    const [isGathering, setIsGathering] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(Date.now());

    const elapsed = startTime ? currentTime - startTime : 0;
    const progress = Math.min((elapsed / duration) * 100, 100);
    const timeLeft = Math.max(duration - elapsed, 0);
    const isComplete = progress >= 100;
    console.log(isAuto)// viarble added for later to use
    const startGathering = useCallback(() => {
        const now = Date.now();
        setIsGathering(true);
        setStartTime(now);
        setCurrentTime(now);
    }, []);

    const handleGather = useCallback(() => {
        onGather();

        setIsGathering(false);
        setStartTime(null);
    }, [onGather]);

    useEffect(() => {
        if (!isGathering || startTime === null) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;


            if (elapsed >= duration) {
                setCurrentTime(startTime + duration);
                clearInterval(interval);
            } else {
                setCurrentTime(now);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [isGathering, startTime, duration]);

    return (
        <div className="p-4 rounded-lg border-2 border-gray-300 bg-white flex flex-col shadow-2xs">
            {/* Header: Icon + Skill Name */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🪓</span> {/* Replace with dynamic icon */}
                <div>
                    <h3 className="font-bold text-lg">{gatheringSkill}</h3>
                    <p className="text-sm text-gray-600">{gatheringName}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-blue-500 h-4 transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Timer Countdown */}
            <div className="text-center mb-3">
                <span className="text-2xl font-bold text-gray-700">
                    {(timeLeft / 1000).toFixed(1)}s
                </span>
            </div>
            <ThreeStateButton
                onClick={startGathering}
                onAfterClick={handleGather}
                isProcessing={isGathering}
                isComplete={isComplete}
                labelConfig={{ processingText: "Gathering", completeText: "Gather", startText: "Start Gathering" }} />
        </div>
    );
}