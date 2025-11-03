import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { Player, Team } from '../../models';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  player: Player | undefined;
  team: Team | undefined;
  teamId = '';
  playerId = '';
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId') || '';
    this.playerId = this.route.snapshot.paramMap.get('playerId') || '';
    this.titleService.setTitle('BB3 League Visualizer - Player');
    
    this.dataService.getPlayer(this.teamId, this.playerId).subscribe(player => {
      this.player = player;
      this.updateTitle();
    });

    this.dataService.getTeam(this.teamId).subscribe(team => {
      this.team = team;
      this.updateTitle();
    });
  }

  private updateTitle(): void {
    if (this.player) {
      this.titleService.setTitle(`BB3 League Visualizer - ${this.player.name}`);
    }
  }

  // Helper methods to access player stats with backward compatibility
  getPlayerSpp(): number {
    if (!this.player) return 0;
    return this.player.stats.spp.total || this.player.spp || 0;
  }

  getPlayerTouchdowns(): number {
    if (!this.player) return 0;
    return this.player.stats.offense.touchdowns || this.player.touchdowns || 0;
  }

  getPlayerCasualties(): number {
    if (!this.player) return 0;
    return this.player.stats.violenceInflicted?.casualties || this.player.casualties || 0;
  }

  getPlayerCompletions(): number {
    if (!this.player) return 0;
    return this.player.stats.passing?.passes?.successes || this.player.completions || 0;
  }

  getPlayerInterceptions(): number {
    if (!this.player) return 0;
    return this.player.stats.defense?.interceptions?.successes || this.player.interceptions || 0;
  }

  getPlayerYardsRan(): number {
    if (!this.player) return 0;
    return this.player.stats.offense.yardsRunning || this.player.yardsRan || 0;
  }

  getPlayerYardsPassed(): number {
    if (!this.player) return 0;
    return this.player.stats.offense.yardsPassing || this.player.yardsPassed || 0;
  }

  getPlayerMvpCount(): number {
    if (!this.player) return 0;
    return this.player.stats.mvpCount || this.player.mvpCount || 0;
  }
}

