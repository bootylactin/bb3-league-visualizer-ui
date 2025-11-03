import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { Match, CasualtyDetail, GameLogEvent } from '../../models';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent implements OnInit {
  match: Match | undefined;
  matchId = '';
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.matchId = this.route.snapshot.paramMap.get('id') || '';
    this.titleService.setTitle('BB3 League Visualizer - Match');
    
    this.dataService.getMatch(this.matchId).subscribe(match => {
      this.match = match;
      if (match) {
        const homeTeam = match.homeTeam.team?.name || 'Home';
        const awayTeam = match.awayTeam.team?.name || 'Away';
        this.titleService.setTitle(`BB3 League Visualizer - ${homeTeam} vs ${awayTeam}`);
      }
    });
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getCasualtiesByTeam(teamId: string): CasualtyDetail[] {
    if (!this.match?.casualties) return [];
    return this.match.casualties.filter(c => c.attackerTeamId === teamId);
  }

  getCasualtiesSustainedByTeam(teamId: string): CasualtyDetail[] {
    if (!this.match?.casualties) return [];
    return this.match.casualties.filter(c => c.victimTeamId === teamId);
  }

  getGameLogEvents(): GameLogEvent[] {
    if (!this.match?.gameLog) return [];
    return this.match.gameLog.sort((a, b) => {
      if (a.half !== b.half) return a.half - b.half;
      if (a.turn !== b.turn) return a.turn - b.turn;
      return 0;
    });
  }

  getEventIcon(eventType: string): string {
    switch (eventType) {
      case 'touchdown': return '🏈';
      case 'casualty': return '⚔️';
      case 'expulsion': return '🚩';
      case 'interception': return '✋';
      case 'completion': return '📤';
      case 'turnover': return '🔄';
      case 'half-time': return '⏸️';
      case 'game-end': return '🏁';
      default: return '📝';
    }
  }

  getEventColor(eventType: string): string {
    switch (eventType) {
      case 'touchdown': return 'success';
      case 'casualty': return 'danger';
      case 'expulsion': return 'warning';
      case 'interception': return 'info';
      case 'completion': return 'primary';
      case 'turnover': return 'secondary';
      default: return 'dark';
    }
  }

  getInjuryBadgeClass(injuryType: string): string {
    switch (injuryType) {
      case 'death': return 'bg-dark';
      case 'casualty': return 'bg-danger';
      case 'injury': return 'bg-warning text-dark';
      case 'ko': return 'bg-secondary';
      case 'stunned': return 'bg-info';
      default: return 'bg-light';
    }
  }
}

