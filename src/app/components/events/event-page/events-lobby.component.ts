import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { Player } from 'src/app/models/player';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { AppConstants } from 'src/app/app.constants';
import { Event } from 'src/app/models/event';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { error } from 'console';
import { MessagingService } from 'src/app/service/messaging.service';
@Component({
  selector: 'app-events-lobby',
  templateUrl: './events-lobby.component.html',
  styleUrls: ['./events-lobby.component.scss'],
})
export class EventsLobbyComponent implements OnInit {
  waiting: Player[] = [];
  approved: Player[] = [];
  playersInGame: Player[] = [];
  @Input() event_id: number;
  constructor(
    private achievementService: AchievementService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private appConstants: AppConstants,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    console.log(`event id: ${this.event_id}`);
    this.messagingService.currentMessage.subscribe((result) => {
      console.log('received message');
      this.router.navigate(['./app-events-lobby']);
    });
    this.achievementService
      .getEventPlayers(this.event_id)
      .subscribe((item: Event) => {
        console.log(`Event ${item.venue}`);
        item.players.forEach((player: Player) => {
          if (player.isEventApproved) {
            this.approved.push(player);
          } else if (!player.isLookingForGame && player.game_id != null) {
            this.playersInGame.push(player);
          } else {
            this.waiting.push(player);
          }
        });
      });
    console.log(`Players count ${this.approved.length}`);
  }

  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      console.log(`Data ${event.container.data}`);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log(this.buildQueryString(event.container.data));
      this.achievementService
        .approvePlayerForEvent(this.buildQueryString(event.container.data))
        .subscribe((result) => {
          console.log(JSON.stringify(result));
        });
    }
  }

  buildQueryString(players: Player[]): string {
    var ids: string[] = [];
    var queryString: string = '';
    players.forEach((player: Player) => {
      ids.push(`id=${player.id}`);
    });
    queryString = ids.join('&');
    queryString = `?${queryString}`;
    return queryString;
  }

  groupPlayersIntoGames() {
    console.log(`event id ${this.event_id}`);
    this.achievementService.groupPlayersIntoGames(this.event_id).subscribe({
      complete: () => {
        this.cookieService.set(this.appConstants.EVENT_ID, `${this.event_id}`);
        this.router.navigate(['/app-event-games', this.event_id]);
      },
      error: (msg) => {
        console.log(`${msg}`);
      },
      next: () => {},
    });
  }
}
