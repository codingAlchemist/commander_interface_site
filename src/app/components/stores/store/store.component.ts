import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/models/store';
import { EventData } from 'src/app/models/event-data';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { AppConstants } from 'src/app/app.constants';
import { Router } from '@angular/router';
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
    var eventData = new EventData(
      this.store.store_number,
      this.eventForm.value.eventCode!
    );
    this.achievementService.createEvent(eventData).subscribe((event) => {
      this.cookieService.set(this.appConstants.EVENT_CODE, this.eventForm.value.eventCode!)
      this.router.navigate(['/app-event-page']);
    });
  }
}
