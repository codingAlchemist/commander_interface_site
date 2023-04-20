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
    eventCode: ['', [Validators.required, Validators.minLength(6)]],
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
  generateEventCode(){
    var eventCode = this.makeId(6);
    this.eventForm.controls['eventCode'].setValue(eventCode);
  }
  endEvent() {
    var eventCode = this.eventForm.get('eventCode')?.value;
    console.log(`event code ${eventCode}`);
    // this.achievementService.endEvent(this.eventForm.value.eventCode!).subscribe((response) => {
    //   console.log(response.result);
    // })
  }
  submitEvent() {
    if (this.venue.events[0] != null){
      this.router.navigate(['/app-event-page', this.venue.events[0].eventCode]);
    }else{
      if (this.eventForm.get('eventCode')?.value != null){
        var eventData = new EventData(
          this.venue.id,
          this.eventForm.value.eventCode!
        );
        console.log(`venue ${this.venue.id} eventCode ${this.eventForm.get('eventCode')?.value}`)
        this.achievementService.createEvent(eventData).subscribe((event) => {
          this.cookieService.set(this.appConstants.EVENT_CODE, this.eventForm.value.eventCode!)
          this.cookieService.set(this.appConstants.EVENT_DATA, JSON.stringify(eventData));
          this.router.navigate(['/app-event-page', event.eventCode]);
        });
      } else {
        alert("Please enter a event code");
      }

    }
  }
}
