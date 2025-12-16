type Color = "pink" | "blue" | "gray" | "green";
type Shade = 50 | 100 | 200 | 300 | 400 | 500;

interface progressBarProps {
    progress: number;
    activeColor?: `bg-${Color}-${Shade}`
    showProcente?: boolean;
}



export function ProgressBar({ progress, activeColor = "bg-green-400", showProcente = false }: progressBarProps) {
    return (
        <div className="mb-3">
            <div className="w-full bg-gray-200 h-4 overflow-hidden">
                <div
                    className={`h-4 text-gray-200 text-xs transition-all duration-100 ${activeColor}`}
                    style={{ width: `${progress}%` }}
                >
                    <div className="pl-2 text-left">{showProcente ? progress + '%' : null}</div>
                </div>
            </div>
        </div>
    )
}
