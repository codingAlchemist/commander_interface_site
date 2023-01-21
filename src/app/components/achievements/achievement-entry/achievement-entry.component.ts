import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { AchievementServiceService } from '../../service/achievement-service.service';
import { Achievement } from '../../models/achievement';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-achievement-entry',
  templateUrl: './achievement-entry.component.html',
  styleUrls: ['./achievement-entry.component.scss'],
})
export class AchievementEntryComponent implements OnInit {
  private _success = new Subject<string>();

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  
  achievements: Achievement[] = [];
  name = new FormControl('');
  achievement = {} as Achievement;
	successMessage = '';

  constructor(
    private service: AchievementServiceService,
    private formBuilder: FormBuilder
  ) {}

  achievementForm = this.formBuilder.group({
    id: 0,
    name: 'test',
    desc: 'test',
    points: 0,
  });

  ngOnInit(): void {
    this.achievements = [];
    this.service.getAllAchievements().subscribe((result: Achievement[]) => {
      result.forEach((item: Achievement) => {
        console.log(JSON.stringify(item));
        this.achievements.push(item);
      });
    });
  }

  onSuccess(){
    this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }
  onSubmit() {
    console.log('Submit pressed' + this.achievementForm.value);
    let newAchievement = new Achievement(
      this.achievementForm.value.id!,
      this.achievementForm.value.name!,
      this.achievementForm.value.desc!,
      this.achievementForm.value.points!
    );
    this.achievement = newAchievement;
    this.service.createAchievement(newAchievement).subscribe(
      (achievement) => {
        this.achievements.push(achievement);
        this._success.next("Achievement Successfully created!")
        this.onSuccess();
      },
      (error) => {}
    );
  }
}
