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
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ReloadService } from 'src/app/service/reload.service';
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
  event: Event;
  eventData: EventData;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private service: AchievementService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    console.log(`Venue data ${JSON.stringify(this.venue)}`);
    if (this.venue.events != null) {
      this.event = this.venue.events[0];
      console.log(`event code ${JSON.stringify(this.event)}`);
    }
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
    var eventCode = this.event.eventCode;
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Conclude Event',
        message: `Are you sure you want to conclude event ${eventCode}`,
        buttonTitle: 'Ok',
      },
    });
    dialogRef.afterClosed().subscribe((ok) => {
      if (ok) {
        this.service.endEvent(eventCode).subscribe((response) => {
          console.log(response.result);
          this.reloadService.shouldReloadEmitter.emit(true);
        });
      }
    });
  }

  goToEventPage() {}

  eventButtonTapped(): void {
    console.log(`Venue ID: ${this.venue.id} `);
    if (this.event != null && this.event.completed == false) {
      this.router.navigate(['/app-event-page', this.event.eventCode]);
    } else {
      console.log();
      const dialogRef = this.dialog.open(StoreEventDialogComponent, {
        data: { venue: this.venue },
        height: '300px',
        width: '400px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result != 'no code') {
          var eventData = new EventData(this.venue.id, result);
          this.service.createEvent(eventData).subscribe((event: Event) => {
            this.router.navigate(['./app-event-page', event.eventCode]);
          });
        }
      });
    }
  }
}
