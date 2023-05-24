import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { Event } from 'src/app/models/event';
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: AchievementService
  ) {}
  eventCode: string;
  event?: Event;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.eventCode = params['event_code'];
      console.log(`event code ${this.eventCode}`);
      this.service.getEvent(this.eventCode).subscribe((event) => {
        this.event = event;
        console.log(`event : ${JSON.stringify(this.event)}`);
      });
    });
  }
}
