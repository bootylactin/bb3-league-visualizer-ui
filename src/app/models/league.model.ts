import { Team } from './team.model';

/**
 * League Season Information
 */
export interface SeasonInfo {
  season: number;
  startDate?: Date | string;
  endDate?: Date | string;
  status?: 'upcoming' | 'active' | 'completed';
}

/**
 * League Configuration
 */
export interface LeagueConfig {
  name: string;
  description?: string;
  ruleset?: string; // e.g., 'BB2020', 'BB2016', etc.
  maxTeams?: number;
  allowResurrection?: boolean;
  resurrectionCost?: number;
}

/**
 * Complete League Model
 */
export interface League {
  // Basic Information
  id: string;
  name: string;
  season: number;

  // Configuration
  config?: LeagueConfig;

  // Season Information
  seasonInfo?: SeasonInfo;

  // Teams
  teams: Team[];

  // Metadata
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

