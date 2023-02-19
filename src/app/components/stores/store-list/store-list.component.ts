import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/models/owner';
import { AchievementService } from '../../../service/achievement-service.service';


@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  owners:Owner[] = [];
  constructor(private service:AchievementService) { }

  ngOnInit(): void {
    this.owners = [];
    this.service.getAllOwners().subscribe((result: Owner[]) => {
      result.forEach( (item: Owner) => {
        this.owners.push(item);
      });
    });
  }

}
