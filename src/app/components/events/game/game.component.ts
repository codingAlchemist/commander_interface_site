import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models/achievement';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { PlayerAchievement } from 'src/app/models/player_achievement';
import { AchievementService } from 'src/app/service/achievement-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() game: Game;
  players: Player[] = [];
  playerAchievements: PlayerAchievement[];
  displayedColumns: string[] = ['level', 'name', 'points'];
  selectedPlayer: Player;

  constructor(private achievementService: AchievementService) {}

  ngOnInit(): void {}

  showAchievementsForPlayer(player: Player) {
    console.log(player.username);
    this.selectedPlayer = player;
    this.achievementService
      .getAllAchievementsForPlayer(player)
      .subscribe((achievements) => {
        this.playerAchievements = achievements;
        console.log(JSON.stringify(this.playerAchievements));
      });
  }
}
