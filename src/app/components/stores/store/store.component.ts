import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Event } from 'src/app/models/event';
import { MatAccordion } from '@angular/material/expansion';
import { Params, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from 'src/app/app.constants';
import { EventData } from 'src/app/models/event-data';
import { Venue } from 'src/app/models/venue';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { StoreEventDialogComponent } from '../../dialogs/store-event-dialog/store-event-dialog.component';
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
  eventData: EventData;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private appConstants: AppConstants,
    private service: AchievementService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    console.log(`id ${this.venue.id}`);
  }

  makeId(length: number) {
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
  generateEventCode() {
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
  goToEventPage() {
    this.router.navigate(['/app-event-page', this.venue.events[0].eventCode]);
  }

  eventButtonTapped(): void {
    if (this.venue.events[0] != null) {
      this.router.navigate(['/app-event-page', this.venue.events[0].eventCode]);
    } else {
      console.log();
      const dialogRef = this.dialog.open(StoreEventDialogComponent, {
        data: { venue: this.venue },
        height: '300px',
        width: '400px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result != 'no code') {
          console.log(result);
          var eventData = new EventData(this.venue.id, result);
          this.service.createEvent(eventData).subscribe((event: Event) => {
            this.cookieService.set(
              this.appConstants.EVENT_CODE,
              this.eventForm.value.eventCode!
            );
            this.cookieService.set(
              this.appConstants.EVENT_DATA,
              JSON.stringify(eventData)
            );
            this.cookieService.set(this.appConstants.EVENT_ID, `${event.id}`);
            this.router.navigate(['/app-event-page', event.id]);
          });
          console.log(`result ${result}`);
        }
      });
    }
  }
}
