import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { League, Player, Team } from '../../models';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './league.component.html',
  styleUrl: './league.component.css'
})
export class LeagueComponent implements OnInit {
  league: League | null = null;
  topSpp: Player[] = [];
  topCasualties: Player[] = [];
  topTouchdowns: Player[] = [];

  constructor(
    private dataService: DataService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('BB3 League Visualizer - League');
    
    this.dataService.getLeague().subscribe(league => {
      this.league = league;
      if (league) {
        this.titleService.setTitle(`BB3 League Visualizer - ${league.name}`);
      }
    });

    this.dataService.getTopPlayersBySpp(5).subscribe(players => {
      this.topSpp = players;
    });

    this.dataService.getTopPlayersByCasualties(5).subscribe(players => {
      this.topCasualties = players;
    });

    this.dataService.getTopPlayersByTouchdowns(5).subscribe(players => {
      this.topTouchdowns = players;
    });
  }

  getTeamPoints(team: Team): number {
    const wins = team.stats?.wins ?? team.wins ?? 0;
    const draws = team.stats?.draws ?? team.draws ?? 0;
    return (wins * 3) + (draws * 1);
  }

  getTeamById(teamId: string) {
    return this.league?.teams.find(t => t.id === teamId);
  }

  getTotalTeams(): number {
    return this.league?.teams?.length ?? 0;
  }

  getTotalPlayers(): number {
    if (!this.league?.teams) return 0;
    return this.league.teams.reduce((sum, team) => sum + team.players.length, 0);
  }

  getTotalTouchdowns(): number {
    if (!this.league?.teams) return 0;
    return this.league.teams.reduce((sum, team) => {
      const tds = team.stats?.touchdownsFor ?? team.touchdownsFor ?? 0;
      return sum + tds;
    }, 0);
  }

  getTotalCasualties(): number {
    if (!this.league?.teams) return 0;
    return this.league.teams.reduce((sum, team) => {
      const cas = team.stats?.casualtiesFor ?? team.casualtiesFor ?? 0;
      return sum + cas;
    }, 0);
  }

  // Helper methods to access player stats with backward compatibility
  getPlayerSpp(player: Player): number {
    return player.stats?.spp?.total ?? player.spp ?? 0;
  }

  getPlayerTouchdowns(player: Player): number {
    return player.stats?.offense?.touchdowns ?? player.touchdowns ?? 0;
  }

  getPlayerCasualties(player: Player): number {
    return player.stats?.violenceInflicted?.casualties ?? player.casualties ?? 0;
  }
}

