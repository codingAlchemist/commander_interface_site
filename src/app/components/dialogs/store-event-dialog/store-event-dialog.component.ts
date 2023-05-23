import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Venue } from 'src/app/models/venue';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { CookieService } from 'ngx-cookie-service';
import { AppConstants } from 'src/app/app.constants';
import { EventData } from 'src/app/models/event-data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-store-event-dialog',
  templateUrl: './store-event-dialog.component.html',
  styleUrls: ['./store-event-dialog.component.scss'],
})
export class StoreEventDialogComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) venue: Venue;

  eventForm = this.formBuilder.group({
    eventCode: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: AchievementService,
    private cookieService: CookieService,
    private appConstants: AppConstants,
    private dialogRef: MatDialogRef<StoreEventDialogComponent>
  ) {}
  ngOnInit(): void {}
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

  closeDialog() {
    this.dialogRef.close('no code');
  }

  submitEvent() {
    this.dialogRef.close(
      this.eventForm.get('eventCode')?.value != null &&
        this.eventForm.get('eventCode')?.value?.length! >= 6
        ? this.eventForm.get('eventCode')?.value!
        : 'no code'
    );
  }
}
