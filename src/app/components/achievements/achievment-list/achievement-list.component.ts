import { Component, OnInit,ViewChild } from '@angular/core';
import { Achievement } from '../../../models/achievement';
import { AchievementService } from '../../../service/achievement-service.service';

@Component({
  selector: 'app-achievment-list',
  templateUrl: './achievment-list.component.html',
  styleUrls: ['./achievment-list.component.scss']
})
export class AchievmentListComponent implements OnInit {

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