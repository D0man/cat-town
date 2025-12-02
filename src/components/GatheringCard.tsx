// components/GatheringCard.tsx
import { useState, useEffect } from 'react';

interface GatheringCardProps {
    gatheringSkill: string;    // e.g., "Woodcutting"
    gatheringItem: string;     // e.g., "Oak"
    isAuto: boolean;           // Auto-gather enabled?
    duration: number;          // Duration in milliseconds
    onGather: () => void;      // Callback when gather button is clicked
}

export function GatheringCard({
    gatheringSkill,
    gatheringItem,
    isAuto,
    duration,
    onGather,
}: GatheringCardProps) {
    const [progress, setProgress] = useState(0); // 0 to 100
    const [timeLeft, setTimeLeft] = useState(duration); // milliseconds
    const [isGathering, setIsGathering] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    // Start gathering
    const startGathering = () => {
        setIsGathering(true);
        setStartTime(Date.now());
        setProgress(0);
        setTimeLeft(duration);
    };

    // Handle gather button click
    const handleGather = () => {
        onGather();

        if (isAuto) {
            // Auto mode: restart immediately
            startGathering();
        } else {
            // Manual mode: reset and wait for user
            setIsGathering(false);
            setStartTime(null);
            setProgress(0);
            setTimeLeft(duration);
        }
    };

    // Update progress and timer
    useEffect(() => {
        if (!isGathering || startTime === null) return;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            const newTimeLeft = Math.max(duration - elapsed, 0);

            setProgress(newProgress);
            setTimeLeft(newTimeLeft);

            // Auto-gather when complete
            if (newProgress >= 100 && isAuto) {
                handleGather();
            }
        }, 50); // Update every 50ms for smooth animation

        return () => clearInterval(interval);
    }, [isGathering, startTime, duration, isAuto]);

    const isComplete = progress >= 100;

    return (
        <div className="p-4 rounded-lg border-2 border-gray-300 bg-white">
            {/* Header: Icon + Skill Name */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🪓</span> {/* Replace with dynamic icon */}
                <div>
                    <h3 className="font-bold text-lg">{gatheringSkill}</h3>
                    <p className="text-sm text-gray-600">{gatheringItem}</p>
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

            {/* Action Button */}
            {!isGathering && (
                <button
                    onClick={startGathering}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 font-medium"
                >
                    Start Gathering
                </button>
            )}

            {isGathering && !isComplete && (
                <div className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium text-center">
                    Gathering...
                </div>
            )}

            {isGathering && isComplete && (
                <button
                    onClick={handleGather}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 font-medium animate-pulse"
                >
                    Gather! 🎉
                </button>
            )}

            {/* Auto Mode Indicator */}
            {isAuto && (
                <div className="mt-2 text-xs text-center text-blue-600">
                    🔄 Auto-gather enabled
                </div>
            )}
        </div>
    );
}