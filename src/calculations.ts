// calculations.ts
import { XP_TABLE } from './constants';

/**
 * Calculate level from total XP
 * Pure function - no side effects
 */
export function getLevelFromXp(totalXp: number): number {
  let level = 1;
  for (let i = 0; i < XP_TABLE.length; i++) {
    if (totalXp >= XP_TABLE[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return level;
}

/**
 * Calculate XP needed for next level
 */
export function getXpForNextLevel(currentLevel: number): number {
  if (currentLevel >= XP_TABLE.length) {
    return Infinity; // Max level reached
  }
  return XP_TABLE[currentLevel];
}

/**
 * Calculate XP progress to next level (0-1)
 */
export function getXpProgress(currentXp: number, currentLevel: number): number {
  if (currentLevel >= XP_TABLE.length) {
    return 1; // Max level
  }

  const currentLevelXp = XP_TABLE[currentLevel - 1];
  const nextLevelXp = XP_TABLE[currentLevel];
  const xpNeeded = nextLevelXp - currentLevelXp;
  const xpGained = currentXp - currentLevelXp;

  return Math.max(0, Math.min(1, xpGained / xpNeeded));
}


export function calculateOfflineProgressMultiplayer(
  actionStartTime: number,
  actionDuration: number,
): number {
  const currentTime = Date.now()
  console.log(actionStartTime, 'actionStart')
  const timeDifference = currentTime - actionStartTime
  return Math.floor(timeDifference / actionDuration)
}
