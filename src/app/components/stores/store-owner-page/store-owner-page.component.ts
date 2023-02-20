import { Component, OnInit, Input } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { Owner } from 'src/app/models/owner';
import { Store } from 'src/app/models/store';
@Component({
  selector: 'app-store-owner-page',
  templateUrl: './store-owner-page.component.html',
  styleUrls: ['./store-owner-page.component.scss']
})
export class StoreOwnerPageComponent implements OnInit {
  owner:Owner;
  storeRegistrationShown = false;
  stores: Store[] = [];
  constructor(private cookieService: CookieService, private achievmentService: AchievementService) { }
  revealAddStorePage(){
    this.storeRegistrationShown = !this.storeRegistrationShown
  }
  ngOnInit(): void {
    var ownerId = this.cookieService.get("ownerId");
    this.achievmentService.getOwner(ownerId).subscribe((owner) => {
      this.owner = owner;
      this.achievmentService.getStoresByOwner(`${this.owner.id}`).subscribe((stores) => {
        stores.forEach( store => {
          this.stores.push(store);
        });
      })
    });
  }
}
