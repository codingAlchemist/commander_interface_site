import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { PlayerAchievement } from 'src/app/models/player_achievement';
@Component({
  selector: 'app-player-achievement',
  templateUrl: './player-achievement.component.html',
  styleUrls: ['./player-achievement.component.scss'],
})
export class PlayerAchievementComponent implements OnInit {
  @Input() player: Player;
  achievements: PlayerAchievement[] = [];
  constructor(private achievementsService: AchievementService) {}

  ngOnInit(): void {
    this.achievementsService
      .getAllAchievementsForPlayer(this.player)
      .subscribe((results) => {
        this.achievements = results;
        //console.log(JSON.stringify(this.achievements));
      });
  }
}
