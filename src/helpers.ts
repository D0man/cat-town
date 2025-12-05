import { UNLOCKS } from "./constants"
export function isFeatureUnlocked(featureName: keyof typeof UNLOCKS, currentLevel: number): boolean {
    return currentLevel >= UNLOCKS[featureName].requiredLevel;
}
export function camelCaseString(str: string): string {
    return str.toLowerCase()
        .split(' ')
        .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}