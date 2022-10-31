import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { AchievementServiceService } from '../achievement-service.service';
import { Achievement } from '../models/achievement';

@Component({
  selector: 'app-achievement-entry',
  templateUrl: './achievement-entry.component.html',
  styleUrls: ['./achievement-entry.component.scss']
})
export class AchievementEntryComponent implements OnInit {
  achievements:Achievement[] = [];
  name = new FormControl('');

  constructor(private service:AchievementServiceService, private formBuilder: FormBuilder) { }

  achievementForm = this.formBuilder.group({
      achievement: 'test',
      description: 'test',
      points: 0
  })
  
  ngOnInit(): void {
    this.achievements = [];
    this.service.getAllAchievements().subscribe((result:Achievement[]) => {
      result.forEach( (item:Achievement) => {
        console.log(JSON.stringify(item))
        this.achievements.push(item);
      })
    });
  }

  onSubmit(){
    console.log("Submit pressed" + this.achievementForm.value)
    let newAchievement = new Achievement(
      this.achievementForm.value.achievement!,
      this.achievementForm.value.description!,
      this.achievementForm.value.points!);

    this.service.createAchievement(newAchievement).subscribe(achievement => {this.achievements.push(achievement);})
  }

}
