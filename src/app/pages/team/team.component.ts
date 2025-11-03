import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { Team, Player } from '../../models';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {
  team: Team | undefined;
  teamId = '';
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id') || '';
    this.titleService.setTitle('BB3 League Visualizer - Team');
    
    this.dataService.getTeam(this.teamId).subscribe(team => {
      this.team = team;
      if (team) {
        this.titleService.setTitle(`BB3 League Visualizer - ${team.name}`);
      }
    });
  }

  getTotalGames(): number {
    if (!this.team) return 0;
    const wins = this.team.stats.wins || this.team.wins || 0;
    const draws = this.team.stats.draws || this.team.draws || 0;
    const losses = this.team.stats.losses || this.team.losses || 0;
    return wins + draws + losses;
  }

  getWinPercentage(): number {
    if (!this.team || this.getTotalGames() === 0) return 0;
    const wins = this.team.stats.wins || this.team.wins || 0;
    return Math.round((wins / this.getTotalGames()) * 100);
  }

  formatGold(amount: number): string {
    return amount.toLocaleString();
  }

  // Helper methods to access team stats with backward compatibility
  getTeamStat<K extends keyof Team['stats']>(stat: K): number {
    if (!this.team) return 0;
    return this.team.stats[stat] || (this.team[stat] as number) || 0;
  }

  getTreasury(): number {
    if (!this.team) return 0;
    return this.team.financials.treasury || this.team.treasury || 0;
  }

  getTeamValue(): number {
    if (!this.team) return 0;
    return this.team.financials.teamValue || this.team.teamValue || 0;
  }

  // Helper methods to access player stats with backward compatibility
  getPlayerSpp(player: Player): number {
    return player.stats.spp.total || player.spp || 0;
  }

  getPlayerTouchdowns(player: Player): number {
    return player.stats.offense.touchdowns || player.touchdowns || 0;
  }

  getPlayerCasualties(player: Player): number {
    return player.stats.violenceInflicted?.casualties || player.casualties || 0;
  }
}

