import { Component, OnInit,ViewChild } from '@angular/core';
import { Achievement } from '../../../models/achievement';
import { AchievementService } from '../../../service/achievement-service.service';

@Component({
  selector: 'app-achievement-list',
  templateUrl: './achievement-list.component.html',
  styleUrls: ['./achievement-list.component.scss']
})
export class AchievementListComponent implements OnInit {

  achievements:Achievement[] = [];


  constructor(private service:AchievementService) {

   }

  ngOnInit():void {
    this.achievements = [];
    this.service.getAllAchievements().subscribe((result:Achievement[]) => {
      result.forEach( (item:Achievement) => {
        console.log(JSON.stringify(item))
        this.achievements.push(item);
      })
    });
  }

}
