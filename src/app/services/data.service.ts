import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player, Team, League, PlayerStats, SppBreakdown, OffenseStats, PassingStats, AgilityStats, StrengthStats, ViolenceInflictedStats, ViolenceSustainedStats, SuccessAttempts } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   * Helper function to create a Player from legacy format
   * Converts simple stats to the new PlayerStats structure
   */
  private createPlayer(
    id: string,
    name: string,
    position: string,
    teamId: string,
    level: number,
    spp: number,
    touchdowns: number,
    completions: number,
    casualties: number,
    interceptions: number,
    yardsRan: number,
    yardsPassed: number,
    skills: string[],
    injuries: string[],
    mvpCount: number
  ): Player {
    // Create SPP breakdown
    const sppBreakdown: SppBreakdown = {
      total: spp,
      fromMvp: mvpCount * 5, // Each MVP gives 5 SPP
      fromTouchdowns: touchdowns * 3, // Each TD gives 3 SPP
      fromCasualties: casualties * 2, // Each CAS gives 2 SPP
      fromCompletions: completions * 1, // Each completion gives 1 SPP
      fromInterceptions: interceptions * 2 // Each INT gives 2 SPP
    };

    // Create offense stats
    const offense: OffenseStats = {
      touchdowns: touchdowns,
      yardsRunning: yardsRan,
      yardsPassing: yardsPassed > 0 ? yardsPassed : undefined
    };

    // Create passing stats if player has completions
    const passing: PassingStats | undefined = completions > 0 || interceptions > 0 ? {
      passes: {
        successes: completions,
        attempts: completions + (interceptions || 0) + Math.floor(completions * 0.1) // Estimate attempts
      },
      longBombs: { successes: 0, attempts: 0 },
      longPasses: { successes: 0, attempts: 0 },
      shortPasses: { successes: completions, attempts: completions },
      interceptionActionsSustained: interceptions || 0
    } : undefined;

    // Create agility stats (estimate based on touchdowns and yards)
    const agility: AgilityStats | undefined = {
      pickUp: { successes: touchdowns > 0 ? touchdowns : Math.floor(yardsRan / 50), attempts: touchdowns > 0 ? touchdowns + 2 : Math.floor(yardsRan / 50) + 2 },
      dodges: { successes: Math.floor(yardsRan / 20), attempts: Math.floor(yardsRan / 15) },
      handOff: { successes: 0, attempts: 0 },
      jumpOver: { successes: 0, attempts: 0 },
      rush: { successes: Math.floor(yardsRan / 3), attempts: Math.floor(yardsRan / 3) + 2 },
      ballCatches: { successes: touchdowns, attempts: touchdowns + 1 }
    };

    // Create strength stats (estimate based on position and casualties)
    const strength: StrengthStats | undefined = {
      blockActionsDone: casualties * 3,
      blitzActionsDone: casualties,
      blockActionsSustained: 0,
      playersPushedIntoCrowd: 0
    };

    // Create violence inflicted stats
    const violenceInflicted: ViolenceInflictedStats | undefined = {
      avRollsSuccessful: casualties * 2,
      casualties: casualties,
      kills: 0,
      injuries: casualties,
      koResults: Math.floor(casualties * 0.5),
      stunned: Math.floor(casualties * 1.5),
      foulActions: 0
    };

    // Create stats object
    const stats: PlayerStats = {
      spp: sppBreakdown,
      mvpCount: mvpCount,
      offense: offense,
      passing: passing,
      agility: agility,
      strength: strength,
      violenceInflicted: violenceInflicted
    };

    return {
      id,
      name,
      position,
      teamId,
      level,
      skills,
      injuries,
      stats,
      // Legacy fields for backward compatibility
      spp,
      touchdowns,
      completions,
      casualties,
      interceptions,
      yardsRan,
      yardsPassed,
      mvpCount
    };
  }

  /**
   * Helper function to create a Team from legacy format
   */
  private createTeam(
    id: string,
    name: string,
    coach: string,
    race: string,
    wins: number,
    draws: number,
    losses: number,
    touchdownsFor: number,
    touchdownsAgainst: number,
    casualtiesFor: number,
    casualtiesAgainst: number,
    treasury: number,
    teamValue: number,
    players: Player[]
  ): Team {
    return {
      id,
      name,
      coach,
      race,
      stats: {
        wins,
        draws,
        losses,
        touchdownsFor,
        touchdownsAgainst,
        casualtiesFor,
        casualtiesAgainst
      },
      financials: {
        treasury,
        teamValue
      },
      players,
      // Legacy fields for backward compatibility
      wins,
      draws,
      losses,
      touchdownsFor,
      touchdownsAgainst,
      casualtiesFor,
      casualtiesAgainst,
      treasury,
      teamValue
    };
  }

  private initializeLeague(): League {
    const team1Players = [
      this.createPlayer('1-1', 'Big Smash', 'Black Orc Blocker', '1', 4, 56, 8, 0, 12, 0, 450, 0, ['Block', 'Guard', 'Mighty Blow', 'Tackle'], [], 3),
      this.createPlayer('1-2', 'Krumph Da Killa', 'Blitzer', '1', 3, 31, 5, 0, 8, 0, 380, 0, ['Block', 'Mighty Blow'], [], 2),
      this.createPlayer('1-3', 'Thog the Destroyer', 'Black Orc Blocker', '1', 3, 41, 3, 0, 15, 0, 280, 0, ['Block', 'Guard', 'Mighty Blow'], [], 2),
      this.createPlayer('1-4', 'Snargh', 'Troll', '1', 2, 18, 1, 0, 6, 0, 120, 0, ['Regeneration', 'Always Hungry'], [], 1)
    ];

    const team2Players = [
      this.createPlayer('2-1', 'Shadowrunner', 'Runner', '2', 5, 62, 12, 8, 2, 1, 680, 0, ['Block', 'Dodge', 'Sure Hands', 'Side Step', 'Sprint'], [], 4),
      this.createPlayer('2-2', 'Nightwind', 'Blitzer', '2', 3, 38, 7, 0, 5, 0, 420, 0, ['Block', 'Dodge'], [], 2),
      this.createPlayer('2-3', 'Quickblade', 'Runner', '2', 3, 29, 6, 6, 1, 0, 380, 120, ['Block', 'Dodge', 'Sure Hands'], [], 1),
      this.createPlayer('2-4', 'Darkswift', 'Thrower', '2', 2, 24, 2, 14, 1, 2, 150, 380, ['Pass', 'Accurate'], [], 1)
    ];

    const team3Players = [
      this.createPlayer('3-1', 'Gorefang', 'Chaos Warrior', '3', 4, 51, 4, 0, 18, 0, 320, 0, ['Block', 'Guard', 'Mighty Blow', 'Tackle'], [], 3),
      this.createPlayer('3-2', 'Brutalizer', 'Beastman', '3', 3, 33, 6, 0, 7, 0, 410, 0, ['Block', 'Horns'], [], 2),
      this.createPlayer('3-3', 'Bloodspiller', 'Chaos Warrior', '3', 2, 28, 3, 0, 11, 0, 290, 0, ['Block', 'Mighty Blow'], [], 1),
      this.createPlayer('3-4', 'Ripper', 'Minotaur', '3', 2, 21, 2, 0, 9, 0, 180, 0, ['Loner', 'Mighty Blow'], [], 1)
    ];

    const team4Players = [
      this.createPlayer('4-1', 'Thunderbolt', 'Thrower', '4', 4, 48, 3, 22, 2, 3, 220, 520, ['Pass', 'Accurate', 'Strong Arm'], [], 3),
      this.createPlayer('4-2', 'Speedstar', 'Catcher', '4', 3, 35, 9, 0, 1, 0, 480, 0, ['Catch', 'Dodge', 'Block'], [], 2),
      this.createPlayer('4-3', 'Guardian', 'Blitzer', '4', 2, 27, 5, 0, 6, 0, 340, 0, ['Block', 'Guard'], [], 1),
      this.createPlayer('4-4', 'Ironwall', 'Lineman', '4', 2, 18, 2, 0, 4, 0, 190, 0, ['Block'], ['Niggling Injury'], 1)
    ];

    const team5Players = [
      this.createPlayer('5-1', 'Bonesmasher', 'Mummy', '5', 3, 44, 2, 0, 16, 0, 210, 0, ['Block', 'Regeneration', 'Mighty Blow'], [], 2),
      this.createPlayer('5-2', 'Rotwind', 'Wight', '5', 3, 32, 6, 0, 4, 0, 390, 0, ['Block', 'Guard'], [], 2),
      this.createPlayer('5-3', 'Grave Runner', 'Ghoul', '5', 2, 26, 5, 0, 1, 0, 350, 0, ['Dodge'], [], 1),
      this.createPlayer('5-4', 'Skullcrush', 'Mummy', '5', 2, 19, 1, 0, 8, 0, 160, 0, ['Block', 'Regeneration'], [], 1)
    ];

    return {
      id: '1',
      name: 'The Brutal Ball League',
      season: 3,
      teams: [
        this.createTeam('1', 'Grashnak\'s Green Death', 'Grashnak Ironjaw', 'Orc', 8, 1, 2, 24, 18, 31, 19, 120000, 1580000, team1Players),
        this.createTeam('2', 'The Swift Shadows', 'Sneaky Git', 'Dark Elf', 9, 0, 2, 28, 15, 18, 25, 95000, 1450000, team2Players),
        this.createTeam('3', 'The Bone Crushers', 'Skullcracker', 'Chaos', 6, 2, 3, 19, 21, 28, 16, 110000, 1520000, team3Players),
        this.createTeam('4', 'The Golden Griffons', 'Lionheart', 'Human', 7, 1, 3, 22, 19, 15, 22, 105000, 1390000, team4Players),
        this.createTeam('5', 'Undead Legion', 'Necromancer', 'Undead', 5, 1, 5, 17, 20, 22, 18, 98000, 1320000, team5Players)
      ]
    };
  }

  private league: League = this.initializeLeague();

  getLeague(): Observable<League> {
    return of(this.league);
  }

  getTeam(teamId: string): Observable<Team | undefined> {
    const team = this.league.teams.find(t => t.id === teamId);
    return of(team);
  }

  getPlayer(teamId: string, playerId: string): Observable<Player | undefined> {
    const team = this.league.teams.find(t => t.id === teamId);
    const player = team?.players.find(p => p.id === playerId);
    return of(player);
  }

  getAllPlayers(): Observable<Player[]> {
    const allPlayers = this.league.teams.flatMap(team => team.players);
    return of(allPlayers);
  }

  getTopPlayersBySpp(count: number = 5): Observable<Player[]> {
    const allPlayers = this.league.teams.flatMap(team => team.players);
    const sorted = [...allPlayers].sort((a, b) => {
      const aSpp = a.stats.spp.total ?? a.spp ?? 0;
      const bSpp = b.stats.spp.total ?? b.spp ?? 0;
      return bSpp - aSpp;
    });
    return of(sorted.slice(0, count));
  }

  getTopPlayersByCasualties(count: number = 5): Observable<Player[]> {
    const allPlayers = this.league.teams.flatMap(team => team.players);
    const sorted = [...allPlayers].sort((a, b) => {
      const aCas = a.stats.violenceInflicted?.casualties ?? a.casualties ?? 0;
      const bCas = b.stats.violenceInflicted?.casualties ?? b.casualties ?? 0;
      return bCas - aCas;
    });
    return of(sorted.slice(0, count));
  }

  getTopPlayersByTouchdowns(count: number = 5): Observable<Player[]> {
    const allPlayers = this.league.teams.flatMap(team => team.players);
    const sorted = [...allPlayers].sort((a, b) => {
      const aTd = a.stats.offense.touchdowns ?? a.touchdowns ?? 0;
      const bTd = b.stats.offense.touchdowns ?? b.touchdowns ?? 0;
      return bTd - aTd;
    });
    return of(sorted.slice(0, count));
  }
}

