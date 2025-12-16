import { useEffect, useState } from "react";
import { useInterval } from "@hooks/useInterval";
import { ProgressBar } from "@components/ProgressBar"
import { formatTime } from "@/helpers";
interface InfoCardProps {
    skill: string;    // e.g., "Woodcutting"
    actionName: string | null;     // e.g., "Oak"
    duration: number;          // Duration in milliseconds
    onTimesEnd: () => void;      // Callback when action ends
}



export function InfoCard({ skill, actionName, duration, onTimesEnd }: InfoCardProps) {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(Date.now());

    const elapsed = startTime ? currentTime - startTime : 0;
    const progress = Math.floor(Math.min((elapsed / duration) * 100, 100));
    const timeLeft = Math.max(duration - elapsed, 0);

    useEffect(() => {
        const now = Date.now();
        setStartTime(now)
        setCurrentTime(now)
    }, [actionName])

    useInterval(() => {
        startTimers()
        updateTime()
    }, 50)

    const startTimers = () => {
        const now = Date.now();
        if (startTime === null) {
            setStartTime(now);
        }
        setCurrentTime(now);
    }


    const updateTime = () => {
        if (startTime !== null) {
            const now = Date.now();
            const elapsed = now - startTime;
            if (elapsed >= duration) {
                setStartTime(now)
                onTimesEnd()
            }
        }
    }




    return (
        <div>
            <div className="pixeled piexeled-border pixeled-blue-500 text-center p-4" >
                <div className="text-2xl">🪓</div>
                <div className="font-bold text-4xl">{skill}</div>
                <div className="font-light">{actionName}</div>
                <ProgressBar showProcente progress={progress} />
                <div className="text-xl font-bold">{formatTime(timeLeft)}</div>

            </div>
        </div>

    )
}