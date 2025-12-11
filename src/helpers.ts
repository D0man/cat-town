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