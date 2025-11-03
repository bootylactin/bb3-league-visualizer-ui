import { Player } from './player.model';

/**
 * Team Statistics
 */
export interface TeamStats {
  wins: number;
  draws: number;
  losses: number;
  touchdownsFor: number;
  touchdownsAgainst: number;
  casualtiesFor: number;
  casualtiesAgainst: number;
}

/**
 * Team Financial Information
 */
export interface TeamFinancials {
  treasury: number; // Gold in treasury
  teamValue: number; // Total team value including players
}

/**
 * Complete Team Model
 */
export interface Team {
  // Basic Information
  id: string;
  name: string;
  coachId: string; // Reference to coach ID
  race: string;

  // Legacy/Compatibility fields
  coach?: string; // Kept for backward compatibility, use coachId for new code

  // Statistics
  stats: TeamStats;

  // Financials
  financials: TeamFinancials;

  // Team Composition
  players: Player[];

  // Legacy/Compatibility fields
  wins?: number;
  draws?: number;
  losses?: number;
  touchdownsFor?: number;
  touchdownsAgainst?: number;
  casualtiesFor?: number;
  casualtiesAgainst?: number;
  treasury?: number;
  teamValue?: number;
}

