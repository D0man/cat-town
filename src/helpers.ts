import { UNLOCKS } from "./constants"
export function isFeatureUnlocked(featureName: keyof typeof UNLOCKS, currentLevel: number): boolean {
    return currentLevel >= UNLOCKS[featureName].requiredLevel;
}