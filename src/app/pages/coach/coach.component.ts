import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { Coach, Team, Match } from '../../models';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.css'
})
export class CoachComponent implements OnInit {
  coach: Coach | undefined;
  coachId = '';
  teams: Team[] = [];
  matches: Match[] = [];
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.coachId = this.route.snapshot.paramMap.get('id') || '';
    this.titleService.setTitle('BB3 League Visualizer - Coach');
    
    this.dataService.getCoach(this.coachId).subscribe(coach => {
      this.coach = coach;
      if (coach) {
        this.titleService.setTitle(`BB3 League Visualizer - ${coach.name}`);
      }
    });

    this.dataService.getTeamsByCoach(this.coachId).subscribe(teams => {
      this.teams = teams;
    });

    this.dataService.getMatchesByCoach(this.coachId).subscribe(matches => {
      this.matches = matches;
    });
  }

  formatMatchDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  getMatchResult(match: Match): 'win' | 'draw' | 'loss' | null {
    // Find which team in this match belongs to the coach
    const coachTeam = this.teams.find(t => 
      t.id === match.homeTeam.teamId || t.id === match.awayTeam.teamId
    );
    if (!coachTeam) return null;
    
    const teamPerf = match.homeTeam.teamId === coachTeam.id ? match.homeTeam : match.awayTeam;
    if (teamPerf.result === 'win') return 'win';
    if (teamPerf.result === 'draw') return 'draw';
    if (teamPerf.result === 'loss') return 'loss';
    return null;
  }

  getTeamName(match: Match): string {
    const coachTeam = this.teams.find(t => 
      t.id === match.homeTeam.teamId || t.id === match.awayTeam.teamId
    );
    if (!coachTeam) return 'Unknown Team';
    return coachTeam.name;
  }

  getTeamId(match: Match): string {
    const coachTeam = this.teams.find(t => 
      t.id === match.homeTeam.teamId || t.id === match.awayTeam.teamId
    );
    if (!coachTeam) return '';
    return coachTeam.id;
  }

  getOpponentName(match: Match): string {
    const coachTeam = this.teams.find(t => 
      t.id === match.homeTeam.teamId || t.id === match.awayTeam.teamId
    );
    if (!coachTeam) return 'Opponent';
    const isHome = match.homeTeam.teamId === coachTeam.id;
    const opponent = isHome ? match.awayTeam : match.homeTeam;
    return opponent.team?.name || 'Opponent';
  }

  getOpponentId(match: Match): string {
    const coachTeam = this.teams.find(t => 
      t.id === match.homeTeam.teamId || t.id === match.awayTeam.teamId
    );
    if (!coachTeam) return '';
    const isHome = match.homeTeam.teamId === coachTeam.id;
    const opponent = isHome ? match.awayTeam : match.homeTeam;
    return opponent.teamId;
  }

  getScoreFor(match: Match): number | null {
    if (!match.finalScore) return null;
    const coachTeam = this.teams.find(t => 
      t.id === match.homeTeam.teamId || t.id === match.awayTeam.teamId
    );
    if (!coachTeam) return null;
    const isHome = match.homeTeam.teamId === coachTeam.id;
    return isHome ? match.finalScore.home : match.finalScore.away;
  }

  getScoreAgainst(match: Match): number | null {
    if (!match.finalScore) return null;
    const coachTeam = this.teams.find(t => 
      t.id === match.homeTeam.teamId || t.id === match.awayTeam.teamId
    );
    if (!coachTeam) return null;
    const isHome = match.homeTeam.teamId === coachTeam.id;
    return isHome ? match.finalScore.away : match.finalScore.home;
  }

  getTotalGames(): number {
    if (!this.coach) return 0;
    const wins = this.coach.stats.totalWins || this.coach.totalWins || 0;
    const draws = this.coach.stats.totalDraws || this.coach.totalDraws || 0;
    const losses = this.coach.stats.totalLosses || this.coach.totalLosses || 0;
    return wins + draws + losses;
  }

  getWinPercentage(): number {
    if (!this.coach || this.getTotalGames() === 0) return 0;
    const wins = this.coach.stats.totalWins || this.coach.totalWins || 0;
    return Math.round((wins / this.getTotalGames()) * 100);
  }

  // Helper methods to access coach stats with backward compatibility
  getCoachStat<K extends keyof Coach['stats']>(stat: K): number {
    if (!this.coach) return 0;
    const statsValue = this.coach.stats[stat];
    if (typeof statsValue === 'number') {
      return statsValue;
    }
    // Fallback to legacy field if it exists (only for numeric stats)
    const legacyValue = (this.coach as unknown as Record<string, unknown>)[stat];
    return typeof legacyValue === 'number' ? legacyValue : 0;
  }
}

