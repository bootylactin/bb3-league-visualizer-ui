/**
 * Player Statistics Interface
 * Based on Blood Bowl 3 game stats and replay data
 */

/**
 * Success/Attempts pair for tracking action success rates
 */
export interface SuccessAttempts {
  successes: number;
  attempts: number;
}

/**
 * SPP (Star Player Points) breakdown
 */
export interface SppBreakdown {
  total: number;
  fromMvp?: number;
  fromTouchdowns?: number;
  fromCasualties?: number;
  fromCompletions?: number;
  fromInterceptions?: number;
  fromOther?: number;
}

/**
 * Offensive Statistics
 */
export interface OffenseStats {
  touchdowns: number;
  yardsRunning: number; // Yards running with the ball
  yardsPassing?: number; // Yards passing
}

/**
 * Passing Statistics
 */
export interface PassingStats {
  passes: SuccessAttempts;
  longBombs: SuccessAttempts;
  longPasses: SuccessAttempts;
  shortPasses: SuccessAttempts;
  quickPasses?: SuccessAttempts; // Calculated from difference if not tracked
  interceptionActionsSustained?: number;
}

/**
 * Receiving Statistics
 */
export interface ReceivingStats {
  passesReceived: SuccessAttempts;
}

/**
 * Defense Statistics
 */
export interface DefenseStats {
  interceptions: SuccessAttempts;
}

/**
 * Agility Statistics
 */
export interface AgilityStats {
  pickUp: SuccessAttempts;
  dodges: SuccessAttempts;
  handOff: SuccessAttempts; // Always successful, catch is the issue
  jumpOver: SuccessAttempts;
  rush: SuccessAttempts; // GFI (Go For It) attempts
  yardsRushing?: number; // Total yards from GFI - may not be tracked
  ballCatches: SuccessAttempts; // Hand-off receptions, scatters, kick-offs, etc.
}

/**
 * Strength Statistics
 */
export interface StrengthStats {
  blockActionsDone: number;
  blitzActionsDone: number;
  blockActionsSustained: number;
  playersPushedIntoCrowd: number;
}

/**
 * Violence Inflicted Statistics
 */
export interface ViolenceInflictedStats {
  avRollsSuccessful: number; // AV rolls that broke armor
  casualties: number;
  kills: number;
  injuries: number;
  koResults: number;
  stunned: number;
  foulActions: number;
}

/**
 * Violence Sustained Statistics
 */
export interface ViolenceSustainedStats {
  casualties: number;
  koResults: number;
  injuries: number;
  deathResults: number;
  deathResultsPrevented?: number;
  stunned?: number; // Calculated from difference if not tracked
  foulActions: number;
  expulsions: number;
  missedMatches: number;
}

/**
 * Special Action Statistics
 * Used for special abilities like Chainsaw, Hypnotic Gaze, etc.
 */
export interface SpecialActionStats {
  chainsaw?: SuccessAttempts;
  hypnoticGaze?: SuccessAttempts;
  projectileVomit?: SuccessAttempts;
  stab?: SuccessAttempts;
  throwTeamMate?: SuccessAttempts; // Successful Throw Team-Mate
  regeneration?: SuccessAttempts;
  // Can add more special actions as needed
  [key: string]: SuccessAttempts | undefined;
}

/**
 * Complete Player Statistics
 * Aggregates all stat categories
 */
export interface PlayerStats {
  // SPP
  spp: SppBreakdown;
  mvpCount?: number;
  trackSppEarned?: boolean; // Whether to track how SPPs were earned

  // Stat Categories
  offense: OffenseStats;
  passing?: PassingStats;
  receiving?: ReceivingStats;
  defense?: DefenseStats;
  agility?: AgilityStats;
  strength?: StrengthStats;
  violenceInflicted?: ViolenceInflictedStats;
  violenceSustained?: ViolenceSustainedStats;
  specialActions?: SpecialActionStats;
}

/**
 * Player Injury Information
 */
export interface PlayerInjury {
  type: string; // e.g., 'Niggling Injury', 'Serious Injury', 'Dead', etc.
  description?: string;
}

/**
 * Player Skill
 */
export interface PlayerSkill {
  name: string;
  category?: 'General' | 'Agility' | 'Strength' | 'Passing' | 'Mutation' | 'Extraordinary';
}

/**
 * Complete Player Model
 */
export interface Player {
  // Basic Information
  id: string;
  name: string;
  position: string;
  teamId: string;

  // Player Attributes
  level: number;
  skills: PlayerSkill[] | string[]; // Can be string for simple display or full objects
  injuries: PlayerInjury[] | string[]; // Can be string for simple display or full objects

  // Statistics
  stats: PlayerStats;

  // Legacy/Compatibility fields (for backward compatibility with existing code)
  spp?: number;
  touchdowns?: number;
  completions?: number;
  casualties?: number;
  interceptions?: number;
  yardsRan?: number;
  yardsPassed?: number;
  mvpCount?: number;
}

