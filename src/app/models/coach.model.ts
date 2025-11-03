/**
 * Coach Statistics
 * Tracks overall coaching performance across teams
 */
export interface CoachStats {
  totalWins: number;
  totalDraws: number;
  totalLosses: number;
  totalTouchdownsFor: number;
  totalTouchdownsAgainst: number;
  totalCasualtiesFor: number;
  totalCasualtiesAgainst: number;
  seasonsCoached?: number;
  championships?: number;
}

/**
 * Complete Coach Model
 */
export interface Coach {
  // Basic Information
  id: string;
  name: string;
  
  // Statistics
  stats: CoachStats;

  // Legacy/Compatibility fields (for backward compatibility with existing code)
  totalWins?: number;
  totalDraws?: number;
  totalLosses?: number;
  totalTouchdownsFor?: number;
  totalTouchdownsAgainst?: number;
  totalCasualtiesFor?: number;
  totalCasualtiesAgainst?: number;
}

