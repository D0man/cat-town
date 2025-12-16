import { UNLOCKS, GatherConfig } from "./constants"
export function isFeatureUnlocked(featureName: keyof typeof UNLOCKS, currentLevel: number): boolean {
    return currentLevel >= UNLOCKS[featureName].requiredLevel;
}
export function camelCaseString(str: string): string {
    return str.toLowerCase()
        .split(' ')
        .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

export function getNextRequiredLevel(config: GatherConfig, currentLevel: number): number | null {
    const levels = Object.values(config)
        .map(item => item.requiredLevel)
        .filter(level => level > currentLevel)
        .sort((a, b) => a - b);

    return levels.length > 0 ? levels[0] : null;
}

export function formatTime(ms: number) {
    const seconds = Math.floor(ms / 1000)
    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} min`;
    }
    const tenthsSeconds = Math.floor((ms % 1000) / 100);
    return `${seconds}.${tenthsSeconds} sec`;

}