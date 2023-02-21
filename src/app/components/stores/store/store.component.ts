import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/models/store';
import { EventData } from 'src/app/models/event-data';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AchievementService } from 'src/app/service/achievement-service.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @Input() store: Store;
  dataBsTarget = "";
  isOpen = false;
  eventForm =  this.formBuilder.group({
    eventCode:['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder, private achievementService: AchievementService) { }

  ngOnInit(): void {
    this.dataBsTarget = "#collapseOne"
  }
  collapseEventSection(){
    this.isOpen = !this.isOpen
  }
  submitEvent(){
    var eventData = new EventData(this.store.store_number, this.eventForm.value.eventCode!)
    this.achievementService.createEvent(eventData).subscribe(event => {
      console.log(JSON.stringify(event));
    });
  }

}
