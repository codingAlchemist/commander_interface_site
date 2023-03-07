import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Player } from 'src/app/models/player';
@Component({
  selector: 'app-events-lobby',
  templateUrl: './events-lobby.component.html',
  styleUrls: ['./events-lobby.component.scss']
})
export class EventsLobbyComponent implements OnInit {

  waiting:Player[] = [];
  approved:Player[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
