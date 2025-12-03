interface LabelConfig {
    processingText: string;
    completeText: string;
    startText: string;
}

interface ThreeStateButtonProps {
    isProcessing: boolean;
    isComplete: boolean;
    onClick: () => void;
    onAfterClick: () => void;
    labelConfig: LabelConfig;
    className?: string;
}

export default function ThreeStateButton({
    isProcessing,
    isComplete,
    onClick,
    onAfterClick,
    labelConfig,
    className = "",
}: ThreeStateButtonProps) {
    // Derive a single unified mode
    const mode: "idle" | "processing" | "complete" =
        isProcessing && !isComplete
            ? "processing"
            : isComplete
                ? "complete"
                : "idle";

    // Lookup tables
    const textMap = {
        idle: labelConfig.startText,
        processing: labelConfig.processingText,
        complete: labelConfig.completeText,
    } as const;

    const classMap = {
        idle: "bg-blue-500 text-white hover:bg-blue-600 font-medium",
        processing: "bg-gray-300 text-gray-600 cursor-wait",
        complete: "bg-green-500 text-white hover:bg-green-600 font-medium",
    } as const;

    const disabled = mode === "processing";
    const content = textMap[mode];
    const stateClasses = classMap[mode];

    return (
        <button
            type="button"
            onClick={() => {
                if (!disabled) isComplete ? onAfterClick() : onClick();
            }}
            disabled={disabled}
            aria-busy={mode === "processing"}
            aria-pressed={mode === "complete"}
            className={`py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${stateClasses} ${className}`}
        >
            <span className="flex flex-inline flex-col items-center justify-center gap-2">
                {mode === "processing" && (
                    <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                )}

                <span>{content}</span>

                {mode === "complete" && (
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                    >
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
        </button>
    );
}
