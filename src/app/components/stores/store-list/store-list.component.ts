import { Component, OnInit } from '@angular/core';
import { Venue_Admin } from 'src/app/models/venue_admin';
import { AchievementService } from '../../../service/achievement-service.service';


@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  admins:Venue_Admin[] = [];
  constructor(private service:AchievementService) { }

  ngOnInit(): void {
    this.admins = [];
    this.service.getAllAdmins().subscribe((result: Venue_Admin[]) => {
      result.forEach( (item: Venue_Admin) => {
        this.admins.push(item);
      });
    });
  }

}
