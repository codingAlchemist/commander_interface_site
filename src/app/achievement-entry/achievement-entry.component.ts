import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AchievementServiceService } from '../achievement-service.service';
import { Achievement } from '../models/achievement';

@Component({
  selector: 'app-achievement-entry',
  templateUrl: './achievement-entry.component.html',
  styleUrls: ['./achievement-entry.component.scss']
})
export class AchievementEntryComponent implements OnInit {
  model = new Achievement(0,"test","test achievement", 0);
  achievements:Achievement[] = [];
  name = new FormControl('');

  constructor(private service:AchievementServiceService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    console.log("Submit pressed")
    this.service.getAllAchievements().subscribe((result:Achievement[]) => {
      result.forEach( (item:Achievement) => {
        console.log(JSON.stringify(item))
        this.achievements.push(item);
      })
  });
  }

}
