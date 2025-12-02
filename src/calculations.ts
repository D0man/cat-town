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

/**
 * Calculate how many resources were gathered during offline time
 * Returns the actual gains after applying offline efficiency penalty
 */
export interface OfflineProgressResult {
  completedActions: number;  // Total actions that could have completed
  actualGains: number;        // After applying efficiency penalty
  timeSinceComplete: number;  // Milliseconds since action completed
}

export function calculateOfflineProgress(
  actionEndTime: number,
  currentTime: number,
  actionDuration: number,
  offlineEfficiency: number
): OfflineProgressResult {
  // Action hasn't completed yet
  if (currentTime < actionEndTime) {
    return {
      completedActions: 0,
      actualGains: 0,
      timeSinceComplete: 0,
    };
  }

  // How much time passed since action completed?
  const timeSinceComplete = currentTime - actionEndTime;

  // How many full actions could have been completed in that time?
  // +1 for the initial action that was in progress
  const completedActions = Math.floor(timeSinceComplete / actionDuration) + 1;

  // Apply offline efficiency penalty (e.g., 0.5 = 50% gains)
  const actualGains = Math.floor(completedActions * offlineEfficiency);

  return {
    completedActions,
    actualGains,
    timeSinceComplete,
  };
}

/**
 * Calculate time remaining for an action
 * Returns milliseconds remaining, or 0 if complete
 */
export function getTimeRemaining(actionEndTime: number, currentTime: number): number {
  return Math.max(0, actionEndTime - currentTime);
}

/**
 * Check if an action is complete
 */
export function isActionComplete(actionEndTime: number | null, currentTime: number): boolean {
  if (actionEndTime === null) return false;
  return currentTime >= actionEndTime;
}