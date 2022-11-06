import { Component, OnInit,Input } from '@angular/core';
import { Achievement } from '../models/achievement';
import { AchievementServiceService } from '../achievement-service.service';

@Component({
  selector: 'app-achievement-item',
  templateUrl: './achievement-item.component.html',
  styleUrls: ['./achievement-item.component.scss']
})
export class AchievementItemComponent implements OnInit {
  showEdit: Boolean = false
  @Input() achievement?:Achievement
  constructor(private service:AchievementServiceService) { }

  ngOnInit(): void {
  }

  showEditAchievement(){
    this.showEdit = !this.showEdit
  }
  onUpdate(achievement: Achievement){

  }

  onAchievementClick(event: number){
    this.service.deleteAchievement(event).subscribe(result => { alert(result.result); window.location.reload(); });
  }
}
