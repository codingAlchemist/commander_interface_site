import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { Player } from 'src/app/models/player';
import { MatDialog } from '@angular/material/dialog';
import { PlayerHomeScreenDialogComponent } from '../player-home-screen-dialog/player-home-screen-dialog.component';
import { LoginData } from 'src/app/models/login-data';
import { CookieService } from 'ngx-cookie-service';
import { passwordStrengthValidator } from 'src/directives/password-validator';

@Component({
  selector: 'app-player-home-screen',
  templateUrl: './player-home-screen.component.html',
  styleUrls: ['./player-home-screen.component.scss'],
})
export class PlayerHomeScreenComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password:  ['',[Validators.required]],
  });
  noPlayerFound = false;

  constructor(
    private service: AchievementService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  login() {
    this.service
      .loginPlayer(
        new LoginData(
          this.loginForm.value.username!,
          this.loginForm.value.password!
        )
      )
      .subscribe((player) => {
        if (!player) {
        }
        console.log(JSON.stringify(player));
        this.cookieService.set('player', JSON.stringify(player));
      });
  }

  onRegisterClick() {
    this.dialog.open(PlayerHomeScreenDialogComponent, {
      width: '300px',
    });
  }
}
