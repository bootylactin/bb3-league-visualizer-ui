import { Player } from './player.model';
import { Team } from './team.model';

/**
 * Match Result
 */
export enum MatchResult {
  WIN = 'win',
  DRAW = 'draw',
  LOSS = 'loss'
}

/**
 * Individual Player Performance in a Match
 */
export interface MatchPlayerPerformance {
  playerId: string;
  player?: Player; // Reference to player data
  sppGained: number;
  touchdowns?: number;
  casualties?: number;
  completions?: number;
  interceptions?: number;
  yardsRan?: number;
  yardsPassed?: number;
  mvp?: boolean;
  // Can add more match-specific stats as needed
}

/**
 * Team Performance in a Match
 */
export interface MatchTeamPerformance {
  teamId: string;
  team?: Team; // Reference to team data
  touchdowns: number;
  casualties: number;
  playerPerformances: MatchPlayerPerformance[];
  result: MatchResult;
}

/**
 * Match Information
 */
export interface Match {
  id: string;
  leagueId: string;
  season: number;
  
  // Teams
  homeTeam: MatchTeamPerformance;
  awayTeam: MatchTeamPerformance;

  // Match Details
  matchDate: Date | string;
  matchWeek?: number;
  round?: number;

  // Match Status
  status: 'scheduled' | 'in-progress' | 'completed';
  
  // Results
  finalScore?: {
    home: number;
    away: number;
  };

  // Metadata
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

