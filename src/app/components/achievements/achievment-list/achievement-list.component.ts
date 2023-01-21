import { Component, OnInit } from '@angular/core';
import { Achievement } from '../../models/achievement';
import { AchievementServiceService } from '../../service/achievement-service.service';

@Component({
  selector: 'app-achievment-list',
  templateUrl: './achievment-list.component.html',
  styleUrls: ['./achievment-list.component.scss']
})
export class AchievmentListComponent implements OnInit {
  achievements:Achievement[] = [];
  
  constructor(private service:AchievementServiceService) {
    
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
