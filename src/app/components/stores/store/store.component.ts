import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { EventData } from 'src/app/models/event-data';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { AppConstants } from 'src/app/app.constants';
import { Router, Params } from '@angular/router';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})

export class StoreComponent implements OnInit {
  @Input() venue: Venue;
  eventForm = this.formBuilder.group({
    eventCode: ['', Validators.required],
  });
  @ViewChild(MatAccordion) accordion: MatAccordion;
  eventData: EventData
  constructor(
    private formBuilder: FormBuilder,
    private achievementService: AchievementService,
    private cookieService: CookieService,
    private appConstants: AppConstants,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  makeId(length:number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  submitEvent() {
    if (this.venue.events[0] != null){
      this.router.navigate(['/app-event-page', this.venue.events[0].eventCode]);
    }else{
      var eventData = new EventData(
        this.venue.venue_number,
        this.eventForm.value.eventCode!
      );
      this.achievementService.createEvent(eventData).subscribe((event) => {
        this.cookieService.set(this.appConstants.EVENT_CODE, this.eventForm.value.eventCode!)
        this.cookieService.set(this.appConstants.EVENT_DATA, JSON.stringify(eventData));
        this.router.navigate(['/app-event-page', event.eventCode]);
      });
    }
  }
}
