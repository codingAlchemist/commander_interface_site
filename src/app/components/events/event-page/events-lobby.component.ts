import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { Player } from 'src/app/models/player';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { AppConstants } from 'src/app/app.constants';
import { EventData } from 'src/app/models/event-data';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-events-lobby',
  templateUrl: './events-lobby.component.html',
  styleUrls: ['./events-lobby.component.scss']
})
export class EventsLobbyComponent implements OnInit {

  waiting:Player[] = [];
  approved:Player[] = [];
  eventData: EventData
  constructor(private achievementService: AchievementService, private cookieService: CookieService, private appConstants: AppConstants,) { }

  ngOnInit(): void {
    const SavedEventData = this.cookieService.get(this.appConstants.EVENT_DATA)
    const event_code = this.cookieService.get(this.appConstants.EVENT_CODE);
    this.eventData = JSON.parse(SavedEventData);
    console.log(this.eventData.event_code);
    this.achievementService.getEventPlayers(this.eventData.event_code, false).subscribe((players: Player[]) => {
      console.log(JSON.stringify(players))
      players.forEach( (item: Player) => {
        this.waiting.push(item);
      })
    })
    this.achievementService.getEventPlayers(this.eventData.event_code, true).subscribe((players: Player[]) => {
      console.log(JSON.stringify(players))
      players.forEach( (item: Player) => {
        this.approved.push(item);
      })
    })
  }

  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(event.container.data[event.container.data.length - 1].event_code)
      let dataItem = event.container.data[event.container.data.length - 1]
      let player = new Player(dataItem.id,"","", "","",0,0,"",false, "", dataItem.event_code);

      this.achievementService.approvePlayerForEvent(player).subscribe((result) => {
        console.log(result.result);
      })
    }
  }
}
