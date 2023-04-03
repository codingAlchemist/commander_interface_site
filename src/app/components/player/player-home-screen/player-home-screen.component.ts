import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-player-home-screen',
  templateUrl: './player-home-screen.component.html',
  styleUrls: ['./player-home-screen.component.scss']
})
export class PlayerHomeScreenComponent implements OnInit {

  constructor(private service: AchievementService){}

  ngOnInit(): void {

  }

  login() {

  }

  registerPlayer() {

  }
}
