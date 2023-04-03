import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models/achievement';
import { Player } from 'src/app/models/player';
import { AchievementService } from 'src/app/service/achievement-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  @Input() gameCode: string;

  players: Player[] = [];
  playerAchievements: Achievement[]
  selectedPlayer: Player
  constructor(private achievementService: AchievementService) {}

  ngOnInit(): void {
    this.achievementService.getAllPlayersForGame(this.gameCode).subscribe((results) => {
      results.forEach( (player: Player) => {
        this.players.push(player);
      });
      this.selectedPlayer = this.players[0];

    });
  }

  showAchievementsForPlayer(player: Player){
    console.log(player.nickname)
    this.selectedPlayer = player;
  }
}
