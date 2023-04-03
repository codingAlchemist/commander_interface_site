import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Game } from 'src/app/models/game';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-event-games',
  templateUrl: './event-games.component.html',
  styleUrls: ['./event-games.component.scss']
})
export class EventGamesComponent implements OnInit {
  @Input() event_id: number;
  games: Game[] = [];
  constructor(private achievementService: AchievementService, private cookieService: CookieService, private appConstants: AppConstants) { }

  ngOnInit(): void {
    console.log()
    this.achievementService.getAllGames(this.event_id).subscribe((_games) => {
      this.games = _games;
    })
  }

}
