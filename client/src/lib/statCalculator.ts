import type { StatName, StatOption, StatResult } from '@shared/schema';

// D&D Point-Buy Cost Table - direct port from C++ algorithm
export const STAT_TABLE: StatOption[] = [
  { score: 6, cost: -2 }, { score: 7, cost: -1 }, { score: 8, cost: 0 },
  { score: 9, cost: 1 }, { score: 10, cost: 2 }, { score: 11, cost: 3 },
  { score: 12, cost: 4 }, { score: 13, cost: 5 }, { score: 14, cost: 7 },
  { score: 15, cost: 9 }, { score: 16, cost: 12 }
];

export const STAT_NAMES: StatName[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

export const STAT_CONFIG = {
  STR: { color: 'red', icon: 'fa-fist-raised', fullName: 'Strength' },
  DEX: { color: 'green', icon: 'fa-running', fullName: 'Dexterity' },
  CON: { color: 'orange', icon: 'fa-heart', fullName: 'Constitution' },
  INT: { color: 'blue', icon: 'fa-brain', fullName: 'Intelligence' },
  WIS: { color: 'purple', icon: 'fa-eye', fullName: 'Wisdom' },
  CHA: { color: 'pink', icon: 'fa-crown', fullName: 'Charisma' }
};

// Convert raw win distribution into target point weights
function calculateTargetCosts(statWins: number[]): number[] {
  const targets: number[] = [];
  const totalWins = statWins.reduce((sum, wins) => sum + wins, 0);
  
  for (let i = 0; i < 6; i++) {
    const percentage = statWins[i] / totalWins;
    targets[i] = percentage * 27.0;
  }
  
  return targets;
}

// Main stat fitting function - direct port from C++ algorithm
export function generateStatSpread(statWins: number[]): { scores: number[], costs: number[], totalCost: number } {
  const targetCosts = calculateTargetCosts(statWins);
  const finalScores = [8, 8, 8, 8, 8, 8]; // Initialize all to 8 (0 cost)
  const currentCosts = [0, 0, 0, 0, 0, 0];
  let totalCost = 0;

  // For each stat, find the best-fit score (closest to target cost)
  for (let i = 0; i < 6; i++) {
    let minDiff = 1000.0;
    let bestScore = 8;
    let bestCost = 0;

    for (const option of STAT_TABLE) {
      const diff = Math.abs(option.cost - targetCosts[i]);
      if (diff < minDiff) {
        minDiff = diff;
        bestScore = option.score;
        bestCost = option.cost;
      }
    }

    finalScores[i] = bestScore;
    currentCosts[i] = bestCost;
    totalCost += bestCost;
  }

  // Adjust to make total cost exactly 27
  while (totalCost !== 27) {
    let adjusted = false;

    for (let i = 0; i < 6 && totalCost !== 27; i++) {
      const currentScore = finalScores[i];
      const currentCost = currentCosts[i];

      // Try increasing stat if under budget
      if (totalCost < 27) {
        for (const option of STAT_TABLE) {
          if (option.score > currentScore) {
            const costDiff = option.cost - currentCost;
            if (totalCost + costDiff <= 27) {
              finalScores[i] = option.score;
              totalCost += costDiff;
              currentCosts[i] = option.cost;
              adjusted = true;
              break;
            }
          }
        }
      }
      // Try decreasing stat if over budget
      else if (totalCost > 27) {
        for (let j = STAT_TABLE.length - 1; j >= 0; j--) {
          const option = STAT_TABLE[j];
          if (option.score < currentScore) {
            const costDiff = currentCost - option.cost;
            if (totalCost - costDiff <= 27) {
              finalScores[i] = option.score;
              totalCost -= costDiff;
              currentCosts[i] = option.cost;
              adjusted = true;
              break;
            }
          }
        }
      }
    }

    if (!adjusted) break; // Failsafe to prevent infinite loop
  }

  return { scores: finalScores, costs: currentCosts, totalCost };
}

export function formatResults(statWins: number[]): StatResult[] {
  const { scores, costs, totalCost } = generateStatSpread(statWins);
  const totalWins = statWins.reduce((sum, wins) => sum + wins, 0);

  // Debug logging to help identify issues
  console.log('StatWins:', statWins);
  console.log('Generated scores:', scores);
  console.log('Costs:', costs);
  console.log('Total cost:', totalCost);

  return STAT_NAMES.map((name, index) => ({
    name,
    wins: statWins[index],
    percentage: Math.round((statWins[index] / totalWins) * 1000) / 10,
    finalScore: scores[index],
    cost: costs[index],
    color: STAT_CONFIG[name].color,
    icon: STAT_CONFIG[name].icon
  }));
}
