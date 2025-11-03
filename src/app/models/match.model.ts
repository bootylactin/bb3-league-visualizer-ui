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
 * Casualty Detail - Who inflicted casualty on whom
 */
export interface CasualtyDetail {
  turn: number;
  attackerPlayerId: string;
  attackerPlayer?: Player;
  attackerTeamId: string;
  victimPlayerId: string;
  victimPlayer?: Player;
  victimTeamId: string;
  injuryType: 'casualty' | 'ko' | 'stunned' | 'injury' | 'death';
  injuryDescription?: string; // e.g., 'Niggling Injury', 'Serious Injury', 'Dead'
  actionType?: string; // e.g., 'Block', 'Blitz', 'Foul', 'Throw Team-Mate'
}

/**
 * Game Log Event Type
 */
export type GameLogEventType = 
  | 'touchdown'
  | 'casualty'
  | 'expulsion'
  | 'interception'
  | 'completion'
  | 'turnover'
  | 'turn-start'
  | 'half-time'
  | 'game-end';

/**
 * Game Log Event
 */
export interface GameLogEvent {
  turn: number;
  half: 1 | 2;
  eventType: GameLogEventType;
  playerId?: string;
  player?: Player;
  teamId?: string;
  description: string;
  timestamp?: string;
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
  expulsions?: number; // Times sent off by referee
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

  // Game Details
  casualties?: CasualtyDetail[]; // Detailed casualty information
  gameLog?: GameLogEvent[]; // Game log of notable actions

  // Metadata
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

