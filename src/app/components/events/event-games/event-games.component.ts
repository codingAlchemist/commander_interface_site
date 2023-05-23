import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Game } from 'src/app/models/game';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { AppConstants } from 'src/app/app.constants';
import { ActivatedRoute, Params } from '@angular/router';
import { Player } from 'src/app/models/player';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-games',
  templateUrl: './event-games.component.html',
  styleUrls: ['./event-games.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class EventGamesComponent implements OnInit {
  @Input() eventCode: string;
  games: Game[] = [];
  players: Player[] = [];
  columnsToDisplay = ['code', 'players', 'time started', 'time ended'];
  expandedColumns = ['id', 'name', 'level', 'points'];

  expandedGame: Game | null;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  constructor(
    private achievementService: AchievementService,
    private cookieService: CookieService,
    private appConstants: AppConstants,
    private route: ActivatedRoute,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.achievementService
      .getAllGamesAndPlayers(this.eventCode)
      .subscribe((_games) => {
        this.games = _games!;
      });
  }

  getPlayers(gameCode: string) {
    console.log(`game code ${gameCode}`);
  }

  formatDate(date: Date): string {
    let dateFormatted: string =
      this.datePipe.transform(date, 'MM-dd-yyyy hh:mm') ?? '';
    return dateFormatted;
  }
}
