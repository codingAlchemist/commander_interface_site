import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store } from 'src/app/models/store';
import { EventData } from 'src/app/models/event-data';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { AppConstants } from 'src/app/app.constants';
import { Router } from '@angular/router';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})

export class StoreComponent implements OnInit {
  @Input() store: Store;
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
    this.achievementService.
    const SavedEventData = this.cookieService.get(this.appConstants.EVENT_DATA)
    if (SavedEventData != null){
      this.eventData = JSON.parse(SavedEventData);
      console.log(`Test ${this.eventData.event_code} ${this.eventData.store_number}`);
      if (this.eventData.store_number == this.store.store_number){
        console.log(`${this.eventData.store_number} is equal to ${this.store.store_number}`)
      }else{
        console.log(`${this.eventData.store_number} is not equal to ${this.store.store_number}`)
      }
    }
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
    if (this.eventData.event_code != null && this.eventData.event_code == this.store.store_number){
      this.router.navigate(['/app-event-page']);
    }else{
      var eventData = new EventData(
        this.store.store_number,
        this.eventForm.value.eventCode!
      );
      this.achievementService.createEvent(eventData).subscribe((event) => {
        this.cookieService.set(this.appConstants.EVENT_CODE, this.eventForm.value.eventCode!)
        this.cookieService.set(this.appConstants.EVENT_DATA, JSON.stringify(eventData));
        this.router.navigate(['/app-event-page']);
      });
    }
  }
}
