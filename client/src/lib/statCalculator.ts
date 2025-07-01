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

// Main stat fitting function - supports both 8-15 and 6-16 ranges
export function generateStatSpread(statWins: number[], expandedRange: boolean = false): { scores: number[], costs: number[], totalCost: number } {
  const totalWins = statWins.reduce((sum, wins) => sum + wins, 0);
  
  // Sort stats by preference (highest wins first)
  const statIndices = Array.from({length: 6}, (_, i) => i);
  statIndices.sort((a, b) => statWins[b] - statWins[a]);
  
  // Initialize all stats to 8 (0 cost baseline)
  const finalScores = [8, 8, 8, 8, 8, 8];
  const currentCosts = [0, 0, 0, 0, 0, 0];
  let totalCost = 0;
  let remainingBudget = 27;
  
  // Assign stats based on preference ranking
  for (let rank = 0; rank < 6; rank++) {
    const statIndex = statIndices[rank];
    const wins = statWins[statIndex];
    
    if (wins === 0 && expandedRange) {
      // No preference = minimum stat (6) only if expanded range is enabled
      finalScores[statIndex] = 6;
      currentCosts[statIndex] = -2;
      totalCost -= 2;
      remainingBudget += 2;
    } else {
      // Calculate desired score based on relative preference
      const maxWins = Math.max(...statWins);
      const preferenceRatio = wins / maxWins;
      
      // Map preference ratio to stat range
      let targetScore;
      if (expandedRange) {
        // Full 6-16 range
        if (preferenceRatio >= 0.9) {
          targetScore = 16; // Very high preference
        } else if (preferenceRatio >= 0.7) {
          targetScore = 15; // High preference  
        } else if (preferenceRatio >= 0.5) {
          targetScore = 14; // Medium-high preference
        } else if (preferenceRatio >= 0.3) {
          targetScore = 13; // Medium preference
        } else if (preferenceRatio >= 0.15) {
          targetScore = 12; // Low-medium preference
        } else {
          targetScore = 10; // Low preference
        }
      } else {
        // Standard 8-15 range
        if (preferenceRatio >= 0.9) {
          targetScore = 15; // Very high preference
        } else if (preferenceRatio >= 0.7) {
          targetScore = 14; // High preference  
        } else if (preferenceRatio >= 0.5) {
          targetScore = 13; // Medium-high preference
        } else if (preferenceRatio >= 0.3) {
          targetScore = 12; // Medium preference
        } else if (preferenceRatio >= 0.15) {
          targetScore = 11; // Low-medium preference
        } else {
          targetScore = 9; // Low preference
        }
      }
      
      // Find the cost for this target score
      const targetOption = STAT_TABLE.find(opt => opt.score === targetScore);
      if (targetOption) {
        finalScores[statIndex] = targetOption.score;
        currentCosts[statIndex] = targetOption.cost;
        totalCost += targetOption.cost;
        remainingBudget -= targetOption.cost;
      }
    }
  }
  
  // Balance the budget to exactly 27 points
  while (totalCost !== 27 && remainingBudget !== 0) {
    let adjusted = false;
    
    // If under budget, increase stats (prioritize highest preference)
    if (totalCost < 27) {
      for (const statIndex of statIndices) {
        const currentScore = finalScores[statIndex];
        const currentCost = currentCosts[statIndex];
        
        // Find next higher score option
        const nextOption = STAT_TABLE.find(opt => opt.score > currentScore);
        if (nextOption) {
          const costIncrease = nextOption.cost - currentCost;
          if (totalCost + costIncrease <= 27) {
            finalScores[statIndex] = nextOption.score;
            currentCosts[statIndex] = nextOption.cost;
            totalCost += costIncrease;
            adjusted = true;
            break;
          }
        }
      }
    }
    // If over budget, decrease stats (prioritize lowest preference)
    else if (totalCost > 27) {
      for (let i = statIndices.length - 1; i >= 0; i--) {
        const statIndex = statIndices[i];
        const currentScore = finalScores[statIndex];
        const currentCost = currentCosts[statIndex];
        
        // Find next lower score option
        const prevOption = STAT_TABLE.slice().reverse().find(opt => opt.score < currentScore);
        if (prevOption) {
          const costDecrease = currentCost - prevOption.cost;
          if (totalCost - costDecrease >= 27) {
            finalScores[statIndex] = prevOption.score;
            currentCosts[statIndex] = prevOption.cost;
            totalCost -= costDecrease;
            adjusted = true;
            break;
          }
        }
      }
    }
    
    if (!adjusted) break; // Prevent infinite loop
  }
  
  return { scores: finalScores, costs: currentCosts, totalCost };
}

export function formatResults(statWins: number[], expandedRange: boolean = false): StatResult[] {
  const { scores, costs } = generateStatSpread(statWins, expandedRange);
  const totalWins = statWins.reduce((sum, wins) => sum + wins, 0);

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
